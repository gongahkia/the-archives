{-# LANGUAGE OverloadedStrings #-}

import Control.Monad (void)
import Data.Aeson (FromJSON, decode, (.:), withObject)
import Data.ByteString.Lazy.Char8 as BL (pack)
import Data.Text as T (unpack, Text)
import Network.HTTP.Conduit (simpleHttp, Request, parseRequest, responseBody)
import Network.HTTP.Simple (setRequestHeader, getResponseBody)
import qualified Data.HashMap.Strict as HM

-- Replace these values with your own Spotify API credentials
clientId :: String
clientId = "your_client_id"

clientSecret :: String
clientSecret = "your_client_secret"

-- Function to get access token
getAccessToken :: IO String
getAccessToken = do
    let url = "https://accounts.spotify.com/api/token"
    request <- parseRequest url
    let request' = setRequestHeader "Authorization" [BL.pack ("Basic " ++ encodeBase64 (clientId ++ ":" ++ clientSecret))] request
    response <- simpleHttp (show request')
    let token = decode response :: Maybe Value
    return $ case token of
        Just v -> v HM.! "access_token"
        Nothing -> error "Failed to get access token"

-- Function to get user's top tracks
getTopTracks :: String -> IO (Maybe Value)
getTopTracks accessToken = do
    let url = "https://api.spotify.com/v1/me/top/tracks"
    request <- parseRequest url
    let request' = setRequestHeader "Authorization" [BL.pack ("Bearer " ++ accessToken)] request
    response <- simpleHttp (show request')
    return $ decode response

-- Function to format statistics in a receipt style
formatReceipt :: Value -> IO ()
formatReceipt tracks = do
    putStrLn "🎶 Your Top Tracks Receipt 🎶"
    putStrLn $ replicate 30 '='
    let items = tracks .: "items"
    forM_ items $ \track -> do
        let name = track .: "name"
        let artists = track .: "artists"
        let album = track .: "album" .: "name"
        let duration = track .: "duration_ms"
        let popularity = track .: "popularity"
        putStrLn $ "Track: " ++ unpack name
        putStrLn $ "Artist: " ++ unpack (T.intercalate ", " [artist .: "name" | artist <- artists])
        putStrLn $ "Album: " ++ unpack album
        putStrLn $ "Duration: " ++ show (duration `div` 60000) ++ " min " ++ show ((duration `mod` 60000) `div` 1000) ++ " sec"
        putStrLn $ "Popularity: " ++ show popularity
        putStrLn $ replicate 30 '-'

main :: IO ()
main = do
    accessToken <- getAccessToken
    topTracks <- getTopTracks accessToken
    
    case topTracks of
        Just tracks -> formatReceipt tracks
        Nothing -> putStrLn "No tracks found."

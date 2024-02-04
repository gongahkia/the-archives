<!-- FUA -->
    <!-- debug HOW TO GET MY SUBMIT BUTTON TO REFRESH THE PAGE EVERYTIME I CLICK THE SUBMISSION BUTTON -->
    <!-- implement color changing text that displays whose turn it currently is -->
    <!-- work out front-end display -->
    <!-- integrate php to save individual cell state -->
    <!-- link the t3-logic.php file and add further logic to that file that reads the input the rerenders this html page -->
        <!-- do i need it to save session info also? -->
        <!-- consider making these radio buttons instead for single-player mode -->
        <!-- offer a multiplayer mode which is the existing mode -->
    <!-- submit form and a difference in color -->
    <!-- rendering engine that tracks the current state of each cell and updates accordingly -->
    <!-- work out actual tic tac toe engine in PHP -->
    <!-- consider adding a cutscene manager or some kind of sprite / gif on the side and a bot that snarkily talks when a good or bad move has been made, except its only in japanese -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- CSS STYLING -->

    <style>
        body {
            display: flex;
            justify-content: space-between;
        }

        #main-content {
            flex-grow: 1;
        }

        #sidebar {
            width: 25%;
            padding: 20px;
            background-color: #f0f0f0;
        }

        #sidebarText {
            text-align: center;
            font-size: 1.8em;
        }

        h1 {
            text-align: center;
            font-size: 3.5em;
            margin-bottom: 0;
        }

        table {
            border-collapse: collapse;
            margin-bottom: 25%;
        }

        td {
            width: 100px;
            height: 100px;
            text-align: center;
            border: 1px solid #000;
        }

        input {
            width: 90%;
            height: 90%;
            box-sizing: border-box;
        }

        .poo-container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }
    </style>

<!-- JS CODE -->

    <script>

    // ---------- PRESETS ----------

        const State = {
            Win: "Win",
            Lose: "Lose",
            Draw: "Draw"
        };

        const botSpeech = {
            "morningGreet": "おはようございます",
            "afternoonGreet": "こんにちは",
            "nightGreet": "こんばんは",
            "startOffer": "ゲームをしませんか？",
            "gameThink": "私は考えている",
            "gameMove": "これが私の動きだ",
            "endCompliment": "君は手強い相手だ",
            "endEncouragement": "次の機会にもう一度",
            "endGoodGame": "好ゲーム",
            "endPlaySoon": "またすぐに対戦しよう",
            "endCircleWins": "サークル優勝",
            "endCrossWins": "クロスの勝利",
            "endDraw": "引き分け"
        };

    // ---------- FUNCTIONS ----------

        // **FUA ADD CODE TO VARY THE TEXT SHOWN BASED ON THE STATE OF THE GAME
        function changeText(botSpeech, botState) {
            var speechBox = document.querySelector("#sidebarText");
            speechBox.innerText = botSpeech["endEncouragement"];
        }

        function displayAsciiGrid(boardState) {
            var fin = "";
            boardState.forEach(function(cellState, cellNumber) {
                if (cellNumber % 3 === 0 && cellNumber !== 0) {
                    fin = fin.slice(0, -1);
                    fin += "\n";
                }
                if (cellState == "circle") {
                    fin += " 0 |";
                } else if (cellState == "cross") {
                    fin += " X |";
                } else if (cellState == "empty") {
                    fin += " * |";
                }
            });
            fin = fin.slice(0, -1);
            fin += "\n";
            return fin;
        }

        function checkState(boardState){
            var circleArray = [];
            var crossArray = [];
            const winState = ["012","345","678","036","147","258","048","246"];
            var state = {
                "cross": State.Draw,
                "circle": State.Draw,
            };
            boardState.forEach(function(cellState, cellNumber) {
                if (cellState == "circle") {
                    circleArray.push(cellNumber.toString());
                } else if (cellState == "cross") {
                    crossArray.push(cellNumber.toString());
                } else {}
            });
            var circleString = circleArray.join("");
            var crossString = crossArray.join("");

            winState.forEach(function(possibility){
                if(crossString.includes(possibility)) {
                    state["cross"] = State.Win;
                } else if (circleString.includes(possibility)) {
                    state["circle"] = State.Win;
                }
            });

            if (state["cross"] == state["circle"]) {
                state["circle"] = State.Draw;
                state["cross"] = State.Draw;
            } else if (state["cross"] == State.Win && state["circle"] == State.Draw) {
                state["cross"] = State.Win;
                state["circle"] = State.Lose;
            } else if (state["circle"] == State.Win && state["cross"] == State.Draw) {
                state["cross"] = State.Lose;
                state["circle"] = State.Win;
            }
            return state;
        }


    // ---------- ACTUAL EVENT LOOP -----------

    // FUA *
        // continue adding code here
        document.addEventListener('DOMContentLoaded', function () {

            var form = document.querySelector("#actual-t3-game");
            var boardState = [
                form.elements.box1.value,
                form.elements.box2.value,
                form.elements.box3.value,
                form.elements.box4.value,
                form.elements.box5.value,
                form.elements.box6.value,
                form.elements.box7.value,
                form.elements.box8.value,
                form.elements.box9.value,
            ];

            form.addEventListener('submit', function (event) {
                event.preventDefault();
                console.log(displayAsciiGrid(boardState));
                console.log(checkState(boardState));
                changeText(botSpeech);
            });

        });

    </script>

</head>
<body>

<!-- ACTUAL PHP CODE -->
    <!-- honestly I would rather decomission the PHP code at this point -->

<?php

/*

// ----------- PRESETS ----------

    $boardState = array(
        isset($_GET["box1"]) ? $_GET["box1"] : "empty",
        isset($_GET["box2"]) ? $_GET["box2"] : "empty",
        isset($_GET["box3"]) ? $_GET["box3"] : "empty",
        isset($_GET["box4"]) ? $_GET["box4"] : "empty",
        isset($_GET["box5"]) ? $_GET["box5"] : "empty",
        isset($_GET["box6"]) ? $_GET["box6"] : "empty",
        isset($_GET["box7"]) ? $_GET["box7"] : "empty",
        isset($_GET["box8"]) ? $_GET["box8"] : "empty",
        isset($_GET["box9"]) ? $_GET["box9"] : "empty"
    );

    enum State {
        case Win;
        case Lose;
        case Draw;
    };

// ---------- FUNCTION DEFINITION ----------

    function displayAsciiGrid(array $boardState):string{
        $fin = "";
        foreach($boardState as $cellNumber => $cellState){
            if ($cellNumber % 3 == 0 and $cellNumber !== 0) {
                $fin = rtrim($fin, "|");
                $fin = $fin . "<br>";
            }
            if ($cellState == "circle") {
                $fin = $fin . " 0 |";
            } elseif ($cellState == "cross") {
                $fin = $fin . " X |";
            } elseif ($cellState == "empty") {
                $fin = $fin . " * |";
            } else {};
        }
        $fin = rtrim($fin, "|");
        $fin = $fin . "<br>";
        return $fin;
    }

    function checkState(array $boardState):array{

        $circleArray = array();
        $crossArray = array();
        $winState = array("012","345","678","036","147","258","048","246");
        $state = array(
            "cross" => State::Draw,
            "circle" => State::Draw
        );

        foreach($boardState as $cellNumber => $cellState) {
            if ($cellState == "circle") {
                array_push($circleArray,strval($cellNumber));
            } else if ($cellState == "cross") {
                array_push($crossArray,strval($cellNumber));
            } else {}
    }

    $circleString = implode($circleArray);
    $crossString = implode($crossArray);

    foreach($winState as $possibility) {
            echo "----------<br>";
            echo "POSSIBILITY => " . $possibility . "<br>";
            echo "CROSS STRING => " . $crossString . "<br>";
            echo "CIRCLE STRING => " . $circleString . "<br>";
            if(strpos($crossString, $possibility) !== False) {
                $state["cross"] = State::Win;
                // echo "cross bingo";
            } elseif(strpos($circleString, $possibility) !== False) {
                $state["circle"] = State::Win;
                // echo "circle bingo";
            }
        }
        if ($state["cross"] == $state["circle"]) {
            $state["circle"] = State::Draw;
            $state["cross"] = State::Draw;
        }
        elseif ($state["circle"] == State::Win && $state["cross"] == State::Draw) {
            $state["circle"] = State::Win;
            $state["cross"] = State::Lose;
        } elseif ($state["cross"] == State::Win && $state["circle"] == State::Draw) {
            $state["circle"] = State::Lose;
            $state["cross"] = State::Win;
        }
        return $state;
    }

// ---------- ACTUAL EVENT LOOP ----------

    // echo displayAsciiGrid($boardState);
    // var_dump(checkState($boardState));

*/

?>

<!-- proper HTML styling -->

    <div id="main-content">
        <h1>まるばつ</h1>
        <div class="poo-container">
            <form id="actual-t3-game"> 
                <table>
                    <tr>
                        <td>
                            <select name="box1">
                                <option value="empty">いいえ</option>
                                <option value="circle">まる</option>
                                <option value="cross">ばつ</option>
                            </select>
                        </td>
                        <td>
                            <select name="box2">
                                <option value="empty">いいえ</option>
                                <option value="circle">まる</option>
                                <option value="cross">ばつ</option>
                            </select>
                        </td>
                        <td>
                            <select name="box3">
                                <option value="empty">いいえ</option>
                                <option value="circle">まる</option>
                                <option value="cross">ばつ</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <select name="box4">
                                <option value="empty">いいえ</option>
                                <option value="circle">まる</option>
                                <option value="cross">ばつ</option>
                            </select>
                        </td>
                        <td>
                            <select name="box5">
                                <option value="empty">いいえ</option>
                                <option value="circle">まる</option>
                                <option value="cross">ばつ</option>
                            </select>
                        </td>
                        <td>
                            <select name="box6">
                                <option value="empty">いいえ</option>
                                <option value="circle">まる</option>
                                <option value="cross">ばつ</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <select name="box7">
                                <option value="empty">いいえ</option>
                                <option value="circle">まる</option>
                                <option value="cross">ばつ</option>
                            </select>
                        </td>
                        <td>
                            <select name="box8">
                                <option value="empty">いいえ</option>
                                <option value="circle">まる</option>
                                <option value="cross">ばつ</option>
                            </select>
                        </td>
                        <td>
                            <select name="box9">
                                <option value="empty">いいえ</option>
                                <option value="circle">まる</option>
                                <option value="cross">ばつ</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <input type="submit" value="仕上げる">
            </form>
        </div>
    </div>
    <div id="sidebar"><h2 id="sidebarText">New content for the target div.</h2></div>
</body>
</html>

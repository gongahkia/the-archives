#include <ncurses.h>
#include <string.h>
#include <stdlib.h> // Include stdlib.h for dynamic memory allocation functions

int main() {
    // ----- curses defaults -----
    initscr(); // initialises curses terminal
    cbreak(); // reads every inputted character as its keycode without waiting for CR (carriage return) to be pressed
    keypad(stdscr, TRUE); // enables other character keycodes to be read
    noecho(); // switch off character echoing in C

    // ----- variable instantiation -----
    int row, col;
    char title[] = "Ukiyo\n";
    char description[] = "the bare-bones text editor\n";
    char instruction[] = "Enter text here (press Enter to finish):\n";
    
    // size of the window
    getmaxyx(stdscr,row,col);
    mvprintw(row/2,(col-strlen(title))/2,"%s",title);
    mvprintw(row/2 + 1,(col-strlen(description))/2,"%s",description);
    mvprintw(row-2,0,"%s", instruction);
    
    refresh();

    char *input = NULL; // Declare input as a pointer to char (char*)
    int ch, i = 0;
    int inputSize = 0; // Variable to track the size of the input

    // Loop to read characters until Escape is pressed (keycode 27)
    while ((ch = getch()) != 27) { 
        if (ch == KEY_F(2)) {
            printw("f2 pressed");
        } else {
            inputSize++; // Increment input size
            input = realloc(input, inputSize * sizeof(char)); // Reallocate memory for input
            if (input == NULL) {
                printw("Memory allocation failed!\n");
                getch(); // Wait for a key press before closing
                endwin(); // ends curses and closes terminal
                return 1; // Return error code
            }
            input[i++] = ch;
            mvprintw(row-1, 0, "Input: %s", input);
            refresh();
        }
    }

    if (ch == '\n') {
        input[i] = '\0'; // Null-terminate the string
        printw("\nInput entered: %s\n", input);
    } else {
        printw("\nInput canceled.\n");
    }

    free(input); // Free allocated memory
    getch(); // Wait for a key press before closing
    endwin(); // ends curses and closes terminal

    return 0;
}

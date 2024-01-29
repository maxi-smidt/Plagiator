# Documentation

## Table of Contents
- [Introduction](#introduction)
- [Tests](#tests)
  - [GUI React](#gui-react)
  - [GUI TKinter](#gui-tkinter)
  - [CLI](#cli)
 

## Solution

### Frontend

TODO 

### Backend

#### [webviewAPI.py](app/api/webviewAPI.py)

This is the API which makes the communication between Python and React possible the functions 
_[computer_comparison](app/api/webviewAPI.py#L64-L70)_ and _[get_history](app/api/webviewAPI.py#L72-L74)_ are essential
for the computation and the persistence of the result.

#### [moss_scanner.py](app/scanner/moss_scanner.py)

The class _[MossScanner](app/scanner/moss_scanner.py#L16-L16)_ is a wrapper for the package _mosspy_, which helps to 
send requests to Moss. Because the GUI can only get the file data, but not the full path, the file is written into a 
temporary directory (that gets deleted automatically). This was a faster approach than clone the whole package just to 
adapt a function. In short two files are send to Moss and the result gets parsed and delivered to the frontend in a 
special dto.

#### [legacyUI.py](app/legacyUI.py)

The class _[LegacyUI](app/legacyUI.py#L14-L14)_ provides an alternative GUI for _Plagiator_ written in Python only. It 
can be used starting the main file like `python main.py --gui=legacy`.

#### [webviewUI.py](app/webviewUI.py)

The class _[WebviewUI](app/webviewUI.py#L6-L6)_ provides the React integration for Python. The React GUI can be startet 
with `python main.py`.

#### [database_manager.py](database/database_manager.py)

The class _[DatabaseManager](database/database_manager.py#L8-L8)_ provides functions to handle all the interaction with 
the SqLite3 database.

#### [ddl.py](database/ddl.py)

This file stores the data definition language that is necessary to create the database.

#### [queries.py](database/queries.py)

This file stores all the queries that are needed in the class _[DatabaseManager](database/database_manager.py#L8-L8)_.

#### [main.py](main.py)

The main file parses the command line arguments [command line arguments](main.py#L68-L80) and depending on the chosen
method it starts the initialization of the database, starts the React or TKinter GUI or the CLI. \
Start the CLI: `python main.py --nogui path_to_file_1 path_to_file_2` \
Start TKInter: `python main.py --gui=legacy` \
Start React: `python main.py` \
Use the debug flag: `python main.py -d (CLI | REACT | TKinter)`
  
## Tests

### GUI React

#### GUI
![GUI](resources/screenshots/test_gui.png)

#### GUI - match
![GUI - match](resources/screenshots/test_gui_match.png)

#### GUI - history 
![GUI - history](resources/screenshots/test_gui_history.png)

#### GUI - load from history
![GUI - load from history](resources/screenshots/test_gui_load_from_history.png)

#### GUI - no connection
![GUI - no connection](resources/screenshots/test_gui_no_connection.png)

#### GUI - pre analysis
![GUI](resources/screenshots/test_gui_pre_analysis.png)

#### GUI - statistic
![GUI](resources/screenshots/test_gui_statistic.png)


### GUI TKinter

#### Legacy
![Legacy](resources/screenshots/test_legacy.png)

#### Legacy - match
![Legacy - match](resources/screenshots/test_legacy_match.png)

#### Legacy - only one file provided
![Legacy - only one file provided](resources/screenshots/test_legacy_one_file.png)

#### Legacy - no file provided
![Legacy - no file provided](resources/screenshots/test_legacy_no_files.png)

#### Legacy - no connection
![Legacy - no connection](resources/screenshots/test_legacy_no_connection.png)

#### Legacy - no match
![Legacy - no match](resources/screenshots/test_legacy_no_match.png)


### CLI

#### CLI - Match
![CLI - Match](resources/screenshots/test_cli.png)

#### CLI - only one file provided
![CLI - only one file provided](resources/screenshots/test_cli_one_file.png)

#### CLI - no file provided
![CLI - no file provided](resources/screenshots/test_cli_no_files.png)

#### CLI - no connection
![CLI - no connection](resources/screenshots/test_cli_no_connection.png)

#### CLI - no match
![CLI - no match](resources/screenshots/test_cli_no_match.png)
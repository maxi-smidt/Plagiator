# Plagiator
## Table of contents
- Introduction
  - Features
- Installation
- Running locally
- Problem
- Test Cases

## Introduction
Plagiator is a fast, scalable and modern plagiarism checker for Matlab Scripts.

### Features
- Cool Frontend
- More to come!

## Release
- See Project Build

## Installation
Before launching you need to install the neccessary dependecies. Make sure you have `Node.js` and `python 3.6^` or higher installed.

### Script
Run [./scripts/install.ps1](./scripts/install.ps1) or [./scripts/install.sh](./scripts/install.sh) from the `root` directory to install all necessary packages and build the current version of the frontend.

The install script for Windows is currently better because it allows some config options aswell as applying a hotfix to pywebview and checking if the venv is already installed 
- use the `-skip-web` flag to skip installing the npm requirements and building the frontend
- use the `-skip-app` flag to not create the virtual environment and install the python requirements
  - use the `-force-recreate-venv` flag to, well, force the virtual environment to be recreated. (ignored if `-skip-app` is present)
  - use the `-force-package-reinstall` flag to force the python requirements to be reinstalled (ignored if `-skip-app` is present)

### Manual
**Note** Proceed  with caution.
#### Web
Build the React based frontend
1. `cd .\web`
2. `npm install`
3. Build the frontend
    - `npm run build` to build it once.
    - `npm run watch` when you plan  on changing the Frontend
    - `npm run report` analyze to see the bundle analysis
    - `npm run dev` to work on the frontend with hot reload in the browser (_no api connection_)
4. `cd ..`
#### Python
Prepare the python side of things 
1. create a virtual environment .venv with `python -m venv venv`
1. activate it using `.\venv\Scripts\activate`
2. `pip install pywebview`

### Noteworthy
There are a few bugs in the `pywebview` python module. Most of them are of visual nature and we can trickily avoid them, but one bug in particular, that is related to executing the `window.kill()` function when you want to close the app is resulting in an error message. The error is not relevant, as the programm is exiting anyways and from our understanding is just because the Promise that would be returned to the frontend would is not beeing returned (because there is no frontend anymore).

To fix this, run the `libraryfix.ps1` script (only on windows).
You can also manually update the code in [.\venv\Lib\site-packages\webview\util.py](.\venv\Lib\site-packages\webview\util.py) (~line 204).
## Running locally for development
You need to run the frontend in a separate terminal. There you 
1. change into the web directory `cd .\web`
2. build the project while watching for changes `npm run watch`.

In another terminal for the python backend: 
1. make sure to be in the virtual environment (run `.\venv\Scripts\activate`).
2. run `py main.py` 

When you make changes in the frontend, restart the python script. It might be necessary to explicitly close the window before you can restart the script.

## Build/Freezing
Run `build.ps1`.

**Note: this is currently only available on Windows.** You can still run the python script locally but the building of an executable is only possible on Windows.
### Exit
Deactivate the virtual environment with `deactivate`.

## Research
- [A state of art on source code plagiarism detection](https://ieeexplore.ieee.org/abstract/document/7877421)
- [Winnowing: Local Algorithms for Document Fingerprinting](https://theory.stanford.edu/~aiken/publications/papers/sigmod03.pdf)

## Solution
Using Tensorflow

#!/bin/sh
echo "Building the Web..."
cd ../web || exit
npm install
npm run build
cd ..
echo "Installing app requirements in virtual environment..."
python -m venv venv
./venv/bin/activate
pip install -r ./requirements.txt
echo "Done!"
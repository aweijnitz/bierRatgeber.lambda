rm lambda.zip 
cd lambda
REM zip –X –r ../index.zip *
C:\tools\7-zip\7z.exe a -tzip -r ..\lambda.zip * 
cd .. 
aws lambda update-function-code --function-name whichBeer --zip-file fileb://lambda.zip

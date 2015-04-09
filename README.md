# Static Site Bootstrap

The purpose of this repository is for you to be able to easily publish a static site to either Github Pages or AWS S3.  The reason this exists is because I have found that creating/modify a static site has too much overhead.

1. Copy the contents of this repository.
2. Modify the contents of the src folder.
3. Run ```npm install```
4. Run ```gulp build```
5. a. For publishing Github Pages ```gulp publish-ghp```
5. b. For publishing S3 ```gulp publish-s3```

## Configuring for S3 publish

There is a `.aws.json.example` file inside the repo. Thats the example configuration file with dummy values. To configure your own just rename that file to `.aws.json` and put your real values in there. That file is listed in `.gitignore` so you don't accidentally upload real credentials on git.

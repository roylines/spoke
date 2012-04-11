# spoke
I radiate therefore I am.

[![Build Status](https://secure.travis-ci.org/roylines/spoke.png)](http://travis-ci.org/roylines/spoke)

## authentication of all calls
add token to header.

## creating a pipe
post: 
http://host:port/pipe/name

## starting a stage in a pipe
post:
http://host:port/pipe/name/stage/name/start

## ending current stage in a pipe
post:
http://host:port/pipe/name/stage/name/ok

## failing a stage in a pipe
post:
http://host:port/pipe/name/stage/name/fail

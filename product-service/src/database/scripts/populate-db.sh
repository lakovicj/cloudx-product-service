#!/bin/sh
aws dynamodb batch-write-item --request-items file://$1 --region us-east-1

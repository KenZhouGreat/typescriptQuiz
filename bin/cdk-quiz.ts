#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkQuizStack } from '../lib/cdk-quiz-stack';

const app = new cdk.App();
new CdkQuizStack(app, 'CdkQuizStack');

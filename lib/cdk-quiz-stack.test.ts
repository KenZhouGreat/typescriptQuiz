import {SynthUtils } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import { CdkQuizStack }  from "./cdk-quiz-stack.js"

describe("CDK Synth Health Test", () => {
    it("shoud throw no errors", () => {
        const app = new cdk.App();
        const stack = new CdkQuizStack(app, 'CdkQuizStack');
        SynthUtils.synthesize(stack);
    });
});
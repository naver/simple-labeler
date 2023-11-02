/**
 * simple-labeler
 * Copyright (c) 2023-present NAVER Corp.
 * Apache-2.0
 */

import * as core from "@actions/core";
import * as github from "@actions/github";
import {minimatch} from "minimatch";

const run = async (): Promise<void> => {
    try {
        const labels = core.getInput("labels").split(",");
        const duplicate = core.getInput("duplicate");
        const token = core.getInput("token");

        const octokit = github.getOctokit(token);
        const {owner, repo, number} = github.context.issue;

        const {data: pr} = await octokit.rest.pulls.get({
            owner,
            repo,
            pull_number: number,
        });

        if (pr.draft) {
            core.info("This is a draft PR. No label added.");
            return;
        }

        if (duplicate && pr.labels.map(({name}) => name).some(name => minimatch(name, duplicate))) {
            core.info(`PR #${number} already has a label matching the pattern "${duplicate}". No new labels added.`);
            return;
        }

        const {data: currentLabels} = await octokit.rest.issues.addLabels({
            owner,
            repo,
            issue_number: number,
            labels,
        });
        const currentLabelNames = currentLabels.map(label => label.name);

        core.info(
            `Labels "${labels.join(", ")}" added to PR #${number}. Current labels on PR: "${currentLabelNames.join(
                ", ",
            )}"`,
        );
    } catch (error) {
        core.setFailed((error as Error).message);
    }
};

run();

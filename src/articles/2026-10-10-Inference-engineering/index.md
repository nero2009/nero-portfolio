---
path: /inference-engineering
date: 2026-10-10
title: Introduction to Inference Engineering
author: Oghenero Adaware
description: Inference engineering covers deploying models so they scale, and optimizing output for speed and correctness. 
tags: ["AI", "LLM", "Inference Engineering"]
---

Inference engineering is the new hype for software engineers in 2026. Everyone is thinking about the next popping area of software development. AI is going to take our jobs, so where do we position ourselves so we are not made redundant?

From what I understand of [this Pragmatic Engineer piece](https://newsletter.pragmaticengineer.com/p/what-is-inference-engineering), inference engineering is a broad field. It runs all the way from deploying these models to optimizing them for correctness and speed. Being a software engineer, I see this as a new frontier for problem solving.

One part is deploying models in a scalable way.we want to be able to scale up when usage is high and scale down when it is low so we are not wasting resources. We want to manage models across multiple cloud providers, and deploy them globally so they are not far from end users. Fundamentally, inference engineering contains aspects of DevOps for AI models.

The other part is optimizing for the metrics that measure the speed, context management and correctness of the model output. These are some fundamental metrics that are used to measure the performance of the model:

- TTFT: time to first token. The time until the first response from the model.
- TPS: tokens per second. How fast the model can spit out tokens.
- ITL: inter-token latency. The time between generating one token and the next.

So you are either on the DevOps side, or on the side trying to optimize for speed of inference (the model calculating, predicting and responding).

You might think big tech already has all the inference engineer jobs, and there are only so many members of technical staff meeded. Open-weight models (read: open source models) now give everyone and their mother the ability to deploy these models and solve their own specific problems cheaply.

My goal is to go into more detail on different aspects of inference engineering. Model deployment, inference optimization, context management, and so on.

This is my understanding at the moment, i might be wrong, the aim is to learn more and more as i go along.

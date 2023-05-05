#!/usr/bin/env node
import 'typeorm-extension/dist/cli';

import { register } from 'ts-node';

register({ transpileOnly: true, });
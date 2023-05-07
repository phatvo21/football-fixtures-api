#!/usr/bin/env node
import 'typeorm/cli';

import { register } from 'ts-node';

register({ transpileOnly: true });

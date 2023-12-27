import {describe, expect, it} from '@jest/globals';

import { REPLY_SIGN } from "@/entity/Message/model/replySign";

import { replyParse } from "./replyParser";
import type { ParsedReplies } from "./types";

describe('replyParse() tests', () => {
    it('Usually text', () => {
        const expected: ParsedReplies = { replies: [], text: ['Hi everyone!'] };
        expect(replyParse('Hi everyone!')).toEqual(expected)
    })

    it('Text with replies', () => {
        const expected: ParsedReplies = { replies: [`22`], text: ['Hi ', '!'] };
        expect(replyParse(`Hi ${REPLY_SIGN}22!`)).toEqual(expected)
    })

    it('Only replies', () => {
        const expected: ParsedReplies = { replies: [`22`,`33`,`44`], text: ['', '', '', ''] };
        expect(replyParse(`${REPLY_SIGN}22${REPLY_SIGN}33${REPLY_SIGN}44`)).toEqual(expected)
    })

    it('Very long reply with obstacles', () => {
        const expected: ParsedReplies = { replies: [`55`], text: ['# #', 'interesting'] };
        expect(replyParse(`# #${REPLY_SIGN}                            55interesting`)).toEqual(expected)
    })
})
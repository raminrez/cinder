# HeroUI canonical-document reading coverage

- **Research date:** 6 November 2026.
- **Completion:** **179/179** discoverable canonical English React documents read in full; **41 reused + 138 additional** reads.
- **Release baseline:** `@heroui/react@3.2.7` and `@heroui/styles@3.2.7`.
- **Pinned source:** `b2c65a5b5236550526f23d475b1ad0c6e5eab1a2` (30 October 2026), independently acquired; not proven to be npm's exact release commit.
- **Synthesis:** [HeroUI research](research-heroui.md).

## Scope and counting

The English React route sets from the captured LLM index, sitemap loc entries and pinned source agree on these 179 URLs. A full read includes the entire selected text, frontmatter/imports where present, inline examples and API tables. Downloads, searches, extracted sections and hashing do not count as full reads.

| Canonical group                       | Documents | Reused full reads | Additional full reads | Final full reads |
| ------------------------------------- | --------: | ----------------: | --------------------: | ---------------: |
| getting-started (including its index) |        16 |                16 |                     0 |               16 |
| components (including its index)      |        74 |                16 |                    58 |               74 |
| migration (including its index)       |        62 |                 4 |                    58 |               62 |
| releases (including its index)        |        27 |                 5 |                    22 |               27 |
| **Total**                             |   **179** |            **41** |               **138** |          **179** |

The reviewed texts total **1,522,291 bytes** and **47,131 lines**. The additional reads total **1,089,103 bytes / 35,000 lines**. Lines are 1-based, inclusive and LF-delimited: count LF bytes plus one for a nonempty unterminated final line. A trailing LF does not add a phantom empty line. Full-read ranges are the union of the retained delivery chunks.

## Text provenance and separate coverage classes

- **176 pinned-source-MDX texts:** complete files from the immutable source snapshot, including inline code/API tables. A ComponentPreview or other linked reference is not its implementation. Saved browser-reader acquisitions are independently listed and hashed, not assumed byte-equivalent to these source files or fully read just because acquired.
- **2 expanded browser-reader texts:** Button and Checkbox. Their complete saved reader output, including expanded examples, was read in the original pass.
- **1 original browser-reader text:** Design Principles uses `discovery/design-principles-reader.txt`, the exact original full read, rather than retroactively substituting its later acquisition or pinned MDX.
- **Prior-read recovery:** retained original tool records were matched against the complete text for all 41 reused pages: 38 pinned-MDX reads and 3 reader outputs. Eleven of those MDX files were already full-file-read in the source ledger; exact recovery resolves the other 27 conservative classifications. These are recovered evidence, not new or duplicate reads.
- **Separate limits:** linked demo/source implementations, rendered visuals, runtime behavior, translations, Native documentation and commercial assets are separate. Native/Pro passages embedded in canonical English release notes were read as inline document text; their linked products were not thereby reviewed. The existing 20/20 runtime checks and supplemental DESIGN.md/Inter license reads retain their previous scope.

- **Workflow includes:** the full/incremental agent guides contain six literal `<include>` directives. All target `migration/index.mdx`, independently covered by a reused full read. Four fragments match source headings; both `#step-6-component-migration-reference` fragments do not (the heading is `Component Migration Reference`). Source-text coverage does not establish that the expanded workflow bundles resolve or were read. Exact directive/target evidence is retained in `reading/full-document-reads.json`.

All paths below are exact paths relative to `.research/heroui-2026-11-06/`. That archive is Git-ignored; this durable file preserves every canonical URL, group, selected path, full-read range/chunks, original reader/source hashes, and page finding. Findings are document evidence unless they explicitly refer to the already recorded source/runtime comparison. Transient reader-provider errors remain in the retained transcripts; completed reads were accepted through independently matched full deliveries and substantive findings, not CLI exit status alone.

## Evidence hashes

The following SHA-256 values pin the reconciled evidence and its historical checkpoint. The verification record is produced afterward and pins this file and the report, avoiding a circular self-hash. It checks retained text delivery, ranges, acquisition/source/package integrity, local links and formatting; it does not mechanically prove comprehension or execute new runtime tests.

| Archive-relative evidence                                     | SHA-256                                                            |
| ------------------------------------------------------------- | ------------------------------------------------------------------ |
| `docs-manifest.json`                                          | `288efb98c6732e9dbd1aee097b7a2208c700935506acf24938d263b664f090b5` |
| `source-coverage.json`                                        | `4c19a970146dad94d7e3c19ed7317c0b015de83fabc6ece7263ce87fc1936da3` |
| `coverage-ledger.md`                                          | `51c30dd444238c9587ee9633a928036ae2cac357af98a380c06cf2867ac2235e` |
| `reading/full-document-reads.json`                            | `cb71106a064d3ce14ac833f4d6a5ec0e8e123ec8b77d9599f1ee7f9c483b101b` |
| `source-pins.json`                                            | `14f373369eb93f60c1a5383ccdeb24a71079129b38f21945d250cc3bacd0e67a` |
| `supplemental-acquisition.json`                               | `ed3ea778f14450306c1d080b900769d43bba84e0eb836c077dafdb9d5abde045` |
| `discovery/validated-coverage.json`                           | `51defadb85817b3ac9b6bdfb99ff2988cd6dbf672e89198aefe9007c31bdc0a8` |
| `history/pre-full-reading/docs-manifest.json`                 | `d0aa6a9e711bd053f9f240c67fa94c6f62638a4703e761023ea98756ebf99414` |
| `history/pre-full-reading/source-coverage.json`               | `c069ca3d9ffccbcdd93c169d6762483fa3153b0e99cf83ad3136a1afb4dc7fa3` |
| `history/pre-full-reading/verification.json`                  | `adf8c86c97c4b60e43d382c395ec42a0b1580cba5a57950f2529b52e27ee4609` |
| `history/pre-full-reading/original-reading-tool-records.json` | `815006c03390fcd236e6813c854b21c33e27595b42df393daa52f48adbf48eef` |
| `reading/full-read-assignments.json`                          | `1fc3c4ce298fb57f52cc873c83310c0443537eaec9befc208ee61f6f7dab7844` |
| `reading/prior-read-path-recovery.json`                       | `3364a97bf1c59a6800989a3cb7863b8a08f5280210c7e90dc579da7434bb2e71` |
| `reading/prior-full-read-findings.json`                       | `c371d690c86aa6ae25866f0d735cb9797eab3dfdb506a0809099a6ee7da53bbc` |
| `reading/reconcile-full-reads.py`                             | `029b7763b56f203cf8cb0c3aec4fe6a213bc963d0cb186f85544ef1df01614a7` |
| `finalize-evidence.py`                                        | `0a32abaae70666f51943ca709c84c82980263fdd38ba3822f474c3b972be84a0` |
| `verify-evidence.py`                                          | `e6cd04cff43b9d2a1167c644ca48ce70f7a65a6b9ea3267692d4e3ee27161c66` |
| `runtime/browser-results.json`                                | `d2232461f3830c505642aab989122eebbd7030841d7ec60d45a84e321f228425` |
| `runtime/probe.py`                                            | `8bfef50591c1d92bb75f58b0307e521b0a036e83b0bd0882cfe00846508629b9` |
| `runtime/fixture.tsx`                                         | `aac3edfb0e5ec35f7f87c4bc9948873e557f867b662950b9ca4ccb703a094206` |
| `runtime/specimen-default-portal.png`                         | `30c4b037d6e44af3d1d22f28c3c3a8a65c8a4346a80ff6cf4e54ef88923dd7ff` |
| `runtime/package-resolution.json`                             | `394492d907b6875fd0e2e15f1c5fe0c5713a06e67068fffab6d47a9548d23dda` |
| `source/styles-source-comparison.json`                        | `1d0455e351bc6d06203b9d5e4853716033387b5cc19bc2a4277e95939536d258` |

### Delegated batch evidence

Each explicit route assignment is disjoint from every other batch and the reused 41 pages. The JSON findings and retained transcript support the per-page records below.

| Batch           | Pages | Assignment SHA-256                                                 | Result SHA-256                                                     | Transcript SHA-256                                                 |
| --------------- | ----: | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `components-01` |    12 | `6cd4f4f281ad55f440aed2905f253ac56d16327c725b25795b809da0bf68893b` | `7664391825ee512ed75c302dc75276567eb345f7d21de35c25f5a013d7e8edb3` | `9fe4fd3dd6b10af5d39d11e6e28833c5a1210b301bc4674b81b30be4f0d058cd` |
| `components-02` |    12 | `ed12f8ed4035ad202cfe810df4ec50d061e03d64979d5a91f64090ff99cf4218` | `2a4e880951046f802d7ec20bebc4607e642696ab11823037ec5677a65a28f48b` | `369dfcce49bf8f4ad28e3b768337aa5eff1bc00b463863ef3ba7ffbdd590bde3` |
| `components-03` |    12 | `c85bc43430b201a944f377733646f763cdaf4a9eba515db0a9ff95c85b821f8a` | `1abe07adbe71bf509a279ed9009dd5caa4612c34f99cc7f925055c0f94a378ce` | `a1fb32133e6751d62a08a36c536657d0b380794712149b43e48a79642c277946` |
| `components-04` |    12 | `16102e3826c322653f7ec48ddb5c8399bd8a9867e3e9147f0346462e3eeae064` | `a4466815f89b1ed4431d56518d996792b07f6bdb8cc0a80d5a583e5f61fccf01` | `1ab6136ba07b250bc4c8480371895c84238abb3dbb013a7557d690ad8e85349e` |
| `components-05` |    10 | `86f93d27059dd5ca60b926e551bebdf443274561347c7e7f6c9c5d8c6d3f878a` | `1119cf4b6a4866089841b487b8475f45e9c2472f8293d7540a57a9df77c40781` | `0fe3a9d0ce5883467e318cb9363000f1da211943ccd53a7c52ac51f10db0cb4e` |
| `migration-01`  |    10 | `e67a2b0e490522518f8173906ca3f5f3b058b9e40915c840eb654cb85c3204e0` | `7566c259a6c2663049bf464a164c546adb76418f99ae7b932bc9f6bf4aa384b3` | `0e2f7df0c4accb07e92bc84a2d8ba1f207f7099d0e2cc99b85df9fbfc90d4d06` |
| `migration-02`  |    10 | `cb582134f76675e8b74acc0821df25fcf73a0443f451d60141a181f1bc7a0694` | `da9f286d6c5f19980ce2546c38c167fe5e6e9b2b6bb0b2f2241a96fb77822eae` | `8bebb9d0873da5c0dbed01069dd72bc9846f1fd84aa20534b3ec33747f564287` |
| `migration-03`  |    10 | `6714e5e18714d714272392662dbb5a207cc601c949efb60c6b38853f71c7833e` | `3d47365763bdb467895d57d69104133f5c3d60edcb181262b3c576782cc05e19` | `20e4477434f720c444a5f2278aa43b48925dcf887ab48d0f32cbea70f90a9510` |
| `migration-04`  |    10 | `1f1e123ce904a22d01315d704518cb2d049afa570233125991a0db02ad6e7552` | `56271063562a58e62b35cbb95362ec35a9e5e55d0a72e818de68c5fc265e8f40` | `3e5c94f8ef3b93eadc0025fccd4b3879857106f60fa9259e701e228c726e495d` |
| `migration-05`  |    10 | `a4f21bf7021ae12d39ef916e7e7c634ae760dbee1bccd38cc67e1e7e29a92b26` | `0121ce616e24ceb0a7e2b1f7c650d7f458b3d0ce43717aa752738353fe050de8` | `46ec90bb36a3c5e9d7ea9826d88f8a0db3901c184d93ead0971fa353a676ca81` |
| `migration-06`  |     8 | `aa9140dc32ffecd9435d1de27c2b00b865880e3d874668cbee5ea3abd9ebd12f` | `bec3d1d97b22e5cd94e6a98f3b541f6e9be2811f6227d2ac0cce85dbdc59aeb8` | `d148c2d5651c81f307a31c55dcf1e8bf7c6de2d5d26d7645932ecb36867eeed9` |
| `releases-01`   |     8 | `9e798cdd4d6cda559ce18a9b95139329542c875a45e928ac64d52d5b1d9e7a6d` | `838f04b8a59507237048129b8c452e494bc762998c7ca7d1626a1e8acb050a4d` | `7a5a8d5a29e12c48efc38ae828c4c730cff61feb934aedb0583c383ab34eec07` |
| `releases-02`   |     8 | `92ab73c4a284e077726bb27c758034f267247021f10c24eb074200d10965bd0d` | `8406395c5a7d57124ba1730330e838dc18cf3325c45de8e0c9f53c3a27284418` | `6a6e2216997a0b7e8d5fa63181e14d7732cb6dd7f7cb7c71c04a0ec0e2028e80` |
| `releases-03`   |     6 | `4a33a0b557a1e948a591f7661420822b48255b875782560281924e51d7242420` | `071c6406f1fcb7d94b7c93a870905fb1884c43ef75637fd11b8e799960d84820` | `807a62dd0e64c9a53c36717ebbd26025edf36de2902d938d5554fc387869b416` |

## getting-started

### 001. [getting-started](https://heroui.com/en/docs/react/getting-started)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/index.mdx` — `pinned-source-mdx`, 4,205 bytes.
- **Full-read lines:** `1-87`; **delivery chunks:** `1-87`.
- **Reviewed SHA-256:** `258b59d6b18e4ac229d745bada96aeadbe8dc1515e5e24c1c39a0365469e7aa3`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/index.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/index.mdx`; SHA-256 `258b59d6b18e4ac229d745bada96aeadbe8dc1515e5e24c1c39a0365469e7aa3`.
- **Saved reader acquisition:** `docs/getting-started.mdx`; 4,129 bytes; SHA-256 `67f15ed4c6bcd2604ec6667a5ca36b5cd0f1b0e5d3f7b1991a1b2be78a33385e`.
- **Finding:** The introduction positions v3 as a maintained, typed React Aria component library for React 19 and Tailwind v4, with composable parts rather than copy-pasted application code.
- **Finding lines:** `1-87` in the reviewed text.

### 002. [getting-started/agent-skills](https://heroui.com/en/docs/react/getting-started/agent-skills)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(ui-for-agents)/agent-skills.mdx` — `pinned-source-mdx`, 2,845 bytes.
- **Full-read lines:** `1-81`; **delivery chunks:** `1-81`.
- **Reviewed SHA-256:** `bebe864b07f7cffe47113844fc29d21c19d85ea06a1270ece7d91772f39b8095`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28ui-for-agents%29/agent-skills.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(ui-for-agents)/agent-skills.mdx`; SHA-256 `bebe864b07f7cffe47113844fc29d21c19d85ea06a1270ece7d91772f39b8095`.
- **Saved reader acquisition:** `docs/getting-started/agent-skills.mdx`; 2,928 bytes; SHA-256 `4e443b069e5e8a2b9df5a49faea03b4c622318a20570cc5f2335f7cd12bd5b27`.
- **Finding:** The agent skill packages installation, component, theming, and composition guidance with separate scripts for docs, source, styles, and theme retrieval; the skill was reviewed as documentation, not installed.
- **Finding lines:** `1-81` in the reviewed text.

### 003. [getting-started/agents-md](https://heroui.com/en/docs/react/getting-started/agents-md)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(ui-for-agents)/agents-md.mdx` — `pinned-source-mdx`, 1,787 bytes.
- **Full-read lines:** `1-54`; **delivery chunks:** `1-54`.
- **Reviewed SHA-256:** `627b2fd352e1371750f7835e2ba66b6ebf0a613ad0ba1fd54216244de4b7dfad`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28ui-for-agents%29/agents-md.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(ui-for-agents)/agents-md.mdx`; SHA-256 `627b2fd352e1371750f7835e2ba66b6ebf0a613ad0ba1fd54216244de4b7dfad`.
- **Saved reader acquisition:** `docs/getting-started/agents-md.mdx`; 1,842 bytes; SHA-256 `157af4d51361ccddd182944df491f463c41e7fee433410f13139aac09829b20d`.
- **Finding:** The documented agents-md command downloads React docs and demos into .heroui-docs/react, generates an AGENTS.md/CLAUDE.md index, and adds the cache to .gitignore; this research did not execute it.
- **Finding lines:** `1-54` in the reviewed text.

### 004. [getting-started/animation](https://heroui.com/en/docs/react/getting-started/animation)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(handbook)/animation.mdx` — `pinned-source-mdx`, 5,368 bytes.
- **Full-read lines:** `1-248`; **delivery chunks:** `1-248`.
- **Reviewed SHA-256:** `c968f7444235e4a716a404eb327261a5e4c56e84e82c7db36b0e7b9f4982a865`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28handbook%29/animation.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(handbook)/animation.mdx`; SHA-256 `c968f7444235e4a716a404eb327261a5e4c56e84e82c7db36b0e7b9f4982a865`.
- **Saved reader acquisition:** `docs/getting-started/animation.mdx`; 5,638 bytes; SHA-256 `63e2a9f59b91e34a6d7467f8cc7dc5282e82598fa0e8d0c5a61b090bba950c4d`.
- **Finding:** Animation guidance documents built-in CSS motion, render-state integration, optional external animation libraries, and reduced-motion controls; disabling transitions does not itself prove every state transform disappears.
- **Finding lines:** `1-248` in the reviewed text.

### 005. [getting-started/cli](https://heroui.com/en/docs/react/getting-started/cli)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(overview)/cli.mdx` — `pinned-source-mdx`, 19,229 bytes.
- **Full-read lines:** `1-555`; **delivery chunks:** `1-555`.
- **Reviewed SHA-256:** `65f1305a8fcd2159fb2a086cf82d36d1b82a32aaae1e1b6b70132ceb7bd128b1`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28overview%29/cli.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(overview)/cli.mdx`; SHA-256 `65f1305a8fcd2159fb2a086cf82d36d1b82a32aaae1e1b6b70132ceb7bd128b1`.
- **Saved reader acquisition:** `docs/getting-started/cli.mdx`; 21,184 bytes; SHA-256 `445d312cd307a1edb3e4fdd1c75046e520640c5e1c818c1512481393c0119439`.
- **Finding:** CLI JSON mode suppresses prompts, including confirmation for install/upgrade/uninstall, while ambiguous platform and initialization choices still need flags; registry lookups use a documented 30-minute cache.
- **Finding lines:** `1-555` in the reviewed text.

### 006. [getting-started/colors](https://heroui.com/en/docs/react/getting-started/colors)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(handbook)/colors.mdx` — `pinned-source-mdx`, 22,457 bytes.
- **Full-read lines:** `1-516`; **delivery chunks:** `1-516`.
- **Reviewed SHA-256:** `70a3b78448680217c3e4bd10e16c439db7e6c434bfe061cb97e41d830cf4a1d3`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28handbook%29/colors.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(handbook)/colors.mdx`; SHA-256 `70a3b78448680217c3e4bd10e16c439db7e6c434bfe061cb97e41d830cf4a1d3`.
- **Saved reader acquisition:** `docs/getting-started/colors.mdx`; 22,424 bytes; SHA-256 `de07de9278a552f37dd75eca018238fb7b4d0b3c792530ca775de0fb71173ab6`.
- **Finding:** The color system distinguishes semantic accent, neutral, status, surface, field, and foreground roles from primitive colors, with runtime CSS variables mapped to Tailwind-facing aliases.
- **Finding lines:** `1-516` in the reviewed text.

### 007. [getting-started/composition](https://heroui.com/en/docs/react/getting-started/composition)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(handbook)/composition.mdx` — `pinned-source-mdx`, 12,883 bytes.
- **Full-read lines:** `1-476`; **delivery chunks:** `1-476`.
- **Reviewed SHA-256:** `8f8a3844648404f14b0a18a351e35dcafc68d9d9f64d4f0d511e988c61dd9307`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28handbook%29/composition.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(handbook)/composition.mdx`; SHA-256 `8f8a3844648404f14b0a18a351e35dcafc68d9d9f64d4f0d511e988c61dd9307`.
- **Saved reader acquisition:** `docs/getting-started/composition.mdx`; 13,190 bytes; SHA-256 `57a48bbcaa4a1bfb43943df439786f37a289bcb294068f09df3b0db2bc85c2ed`.
- **Finding:** Compound parts, BEM classes, variant functions, and the render callback offer distinct composition paths; plain HTML class reuse supplies appearance but not React Aria interaction behavior.
- **Finding lines:** `1-476` in the reviewed text.

### 008. [getting-started/dark-mode](https://heroui.com/en/docs/react/getting-started/dark-mode)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(handbook)/dark-mode.mdx` — `pinned-source-mdx`, 6,392 bytes.
- **Full-read lines:** `1-244`; **delivery chunks:** `1-244`.
- **Reviewed SHA-256:** `6c124b8ee2b8df77083a89c7d748bf363bd5b986cc7b71c89ac566a2e8ab93c3`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28handbook%29/dark-mode.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(handbook)/dark-mode.mdx`; SHA-256 `6c124b8ee2b8df77083a89c7d748bf363bd5b986cc7b71c89ac566a2e8ab93c3`.
- **Saved reader acquisition:** `docs/getting-started/dark-mode.mdx`; 6,632 bytes; SHA-256 `6f48c676ca1966e425e0bd2f3ddfca5e8d896b16b40f43a58f9c3d96389eeac9`.
- **Finding:** Dark mode documents light/dark/system switching, next-themes integration, custom theme names, and useTheme; persistence and framework setup are application integration responsibilities.
- **Finding lines:** `1-244` in the reviewed text.

### 009. [getting-started/design-md](https://heroui.com/en/docs/react/getting-started/design-md)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(ui-for-agents)/design-md.mdx` — `pinned-source-mdx`, 3,607 bytes.
- **Full-read lines:** `1-73`; **delivery chunks:** `1-73`.
- **Reviewed SHA-256:** `f1d522a1161bb7d510ea8763f1d126f84ddecc29acdd05ed9cd9dee757991440`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28ui-for-agents%29/design-md.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(ui-for-agents)/design-md.mdx`; SHA-256 `f1d522a1161bb7d510ea8763f1d126f84ddecc29acdd05ed9cd9dee757991440`.
- **Saved reader acquisition:** `docs/getting-started/design-md.mdx`; 3,925 bytes; SHA-256 `e51a03eed33c48563ef835106b09e808afe75aa4ce96bf74ef765e0b9b4a739a`.
- **Finding:** DESIGN.md carries semantic theme roles, a 4px spacing rhythm, radius and surface guidance; the page explicitly says to update the local design document alongside custom CSS overrides.
- **Finding lines:** `1-73` in the reviewed text.

### 010. [getting-started/design-principles](https://heroui.com/en/docs/react/getting-started/design-principles)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `discovery/design-principles-reader.txt` — `browser-reader`, 8,740 bytes.
- **Full-read lines:** `1-302`; **delivery chunks:** `1-302`.
- **Reviewed SHA-256:** `afd168495d2f340568d56c86865a1c50664f0befda7b23b5a15f17f7fa0efea4`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28overview%29/design-principles.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(overview)/design-principles.mdx`; SHA-256 `fd44906f77762d51fc301450d9c08ba425d956158a8bfd1c21b8d7bc449266eb`.
- **Saved reader acquisition:** `docs/getting-started/design-principles.mdx`; 8,740 bytes; SHA-256 `afd168495d2f340568d56c86865a1c50664f0befda7b23b5a15f17f7fa0efea4`.
- **Finding:** The ten principles prioritize semantic intent, accessibility, composition, and separation of style from logic; the explicit Uber Base citation concerns the semantic button hierarchy, not Base Web implementation reuse.
- **Finding lines:** `1-302` in the reviewed text.

### 011. [getting-started/frameworks](https://heroui.com/en/docs/react/getting-started/frameworks)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(overview)/frameworks.mdx` — `pinned-source-mdx`, 10,940 bytes.
- **Full-read lines:** `1-370`; **delivery chunks:** `1-370`.
- **Reviewed SHA-256:** `592ff2f515fa569e0d7e34452da383d46f92e9694d557034d9a65618d575362e`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28overview%29/frameworks.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(overview)/frameworks.mdx`; SHA-256 `592ff2f515fa569e0d7e34452da383d46f92e9694d557034d9a65618d575362e`.
- **Saved reader acquisition:** `docs/getting-started/frameworks.mdx`; 11,558 bytes; SHA-256 `bfcf327ab632a669dd2b273ffeef6df25fb7852ee477ad4863fd4091e19d90d0`.
- **Finding:** Framework guidance supports React integrations and styles-only use elsewhere, but its recommended @heroui/styles/dist/heroui.min.css import is blocked by the published 3.2.7 export map in the saved Node check.
- **Finding lines:** `1-370` in the reviewed text.

### 012. [getting-started/llms-txt](https://heroui.com/en/docs/react/getting-started/llms-txt)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(ui-for-agents)/llms-txt.mdx` — `pinned-source-mdx`, 2,000 bytes.
- **Full-read lines:** `1-62`; **delivery chunks:** `1-62`.
- **Reviewed SHA-256:** `2ab43037efbca1c79725d61e4d0545e1d668104e532d3479fec00e9e6af14f9f`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28ui-for-agents%29/llms-txt.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(ui-for-agents)/llms-txt.mdx`; SHA-256 `2ab43037efbca1c79725d61e4d0545e1d668104e532d3479fec00e9e6af14f9f`.
- **Saved reader acquisition:** `docs/getting-started/llms-txt.mdx`; 2,301 bytes; SHA-256 `d13fe43a8d7055a0a92e4f9d9ecac6aa64af8ce2253cebc0a721bf3c760495b5`.
- **Finding:** The page distinguishes React-only indexes/full/component/pattern aggregates from all-platform aggregates; reading this guide does not count as reading those larger linked corpora.
- **Finding lines:** `1-62` in the reviewed text.

### 013. [getting-started/mcp-server](https://heroui.com/en/docs/react/getting-started/mcp-server)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(ui-for-agents)/mcp-server.mdx` — `pinned-source-mdx`, 7,358 bytes.
- **Full-read lines:** `1-221`; **delivery chunks:** `1-221`.
- **Reviewed SHA-256:** `028bb73cf21cff527540cf57d00ccc084a6d172b57777bf92beb9b62a4179c1e`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28ui-for-agents%29/mcp-server.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(ui-for-agents)/mcp-server.mdx`; SHA-256 `028bb73cf21cff527540cf57d00ccc084a6d172b57777bf92beb9b62a4179c1e`.
- **Saved reader acquisition:** `docs/getting-started/mcp-server.mdx`; 8,207 bytes; SHA-256 `787a98b1e12a0c3a68dc025f868f14e67e291a0f9b82dcce5e9f013ab3a3c70e`.
- **Finding:** The MCP guide separates tools for component docs, implementation source, CSS, theme variables, and general guides, and describes upgrade assistance; the server was not installed or exercised here.
- **Finding lines:** `1-221` in the reviewed text.

### 014. [getting-started/quick-start](https://heroui.com/en/docs/react/getting-started/quick-start)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(overview)/quick-start.mdx` — `pinned-source-mdx`, 3,403 bytes.
- **Full-read lines:** `1-94`; **delivery chunks:** `1-94`.
- **Reviewed SHA-256:** `d2e83bd895d3ba3958df390f45b465b3e0b42cd044c36fc2f8768398bc5d2efc`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28overview%29/quick-start.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(overview)/quick-start.mdx`; SHA-256 `d2e83bd895d3ba3958df390f45b465b3e0b42cd044c36fc2f8768398bc5d2efc`.
- **Saved reader acquisition:** `docs/getting-started/quick-start.mdx`; 3,681 bytes; SHA-256 `9d12f9cdb50c9d066a25366915034489950aa4c31d9cfaca875a2aed7b05f0f4`.
- **Finding:** Quick start requires React 19 and Tailwind v4, installs the React/styles packages, and imports baseline CSS; the current setup does not require a HeroUIProvider.
- **Finding lines:** `1-94` in the reviewed text.

### 015. [getting-started/styling](https://heroui.com/en/docs/react/getting-started/styling)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(handbook)/styling.mdx` — `pinned-source-mdx`, 6,646 bytes.
- **Full-read lines:** `1-304`; **delivery chunks:** `1-304`.
- **Reviewed SHA-256:** `eeb5395f940e9aee04362b61e0c5e2d9deef77ceac232351cbfa68f38039ebac`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28handbook%29/styling.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(handbook)/styling.mdx`; SHA-256 `eeb5395f940e9aee04362b61e0c5e2d9deef77ceac232351cbfa68f38039ebac`.
- **Saved reader acquisition:** `docs/getting-started/styling.mdx`; 7,101 bytes; SHA-256 `80c24eda565426da458db0734b14183ebf77658120e1ccdba0ab9fd67f0909ea`.
- **Finding:** Styling examples accept BEM/global CSS, CSS Modules, generated CSS-in-JS classes, and render-state classes; consumer override freedom is separate from the library's Tailwind source build requirement.
- **Finding lines:** `1-304` in the reviewed text.

### 016. [getting-started/theming](https://heroui.com/en/docs/react/getting-started/theming)

- **Group / pass:** `getting-started` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(handbook)/theming.mdx` — `pinned-source-mdx`, 23,249 bytes.
- **Full-read lines:** `1-689`; **delivery chunks:** `1-689`.
- **Reviewed SHA-256:** `b2999f62e984d735fe1262f7873ff87c11726a30eede06c212fe2b96ebf911f1`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/%28handbook%29/theming.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/getting-started/(handbook)/theming.mdx`; SHA-256 `b2999f62e984d735fe1262f7873ff87c11726a30eede06c212fe2b96ebf911f1`.
- **Saved reader acquisition:** `docs/getting-started/theming.mdx`; 23,968 bytes; SHA-256 `df841c493a534dd6a06b838747b83614d7455f9b163a92f340ceab9e532baea4`.
- **Finding:** Theming exposes semantic CSS variables and selective import strategies; its bare @heroui/styles/components import does not match the published export map, although explicit component CSS exports resolve.
- **Finding lines:** `1-689` in the reviewed text.

## components

### 017. [components](https://heroui.com/en/docs/react/components)

- **Group / pass:** `components` / `components-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/index.mdx` — `pinned-source-mdx`, 999 bytes.
- **Full-read lines:** `1-64`; **delivery chunks:** `1-64`.
- **Reviewed SHA-256:** `f9ed60a16b72321a5b6c5dfd951c892bbf3e36ca7d83b903ab86f0822ee171c7`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/index.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/index.mdx`; SHA-256 `f9ed60a16b72321a5b6c5dfd951c892bbf3e36ca7d83b903ab86f0822ee171c7`.
- **Saved reader acquisition:** `docs/components.mdx`; 1,229 bytes; SHA-256 `6ca92c31adb5a656d7dd083d73824e780cf25357b00930e573de1dee9bebe1ec`.
- **Finding:** The React index declares 15 categories using ComponentsCategory placeholders, from Buttons through Utilities. Its full MDX establishes the category taxonomy, but does not itself enumerate the rendered components or establish a component count.
- **Finding lines:** `1-8, 10-64` in the reviewed text.

### 018. [components/accordion](https://heroui.com/en/docs/react/components/accordion)

- **Group / pass:** `components` / `components-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(navigation)/accordion.mdx` — `pinned-source-mdx`, 6,467 bytes.
- **Full-read lines:** `1-226`; **delivery chunks:** `1-200, 201-226`.
- **Reviewed SHA-256:** `09fc44d7a9df83a312b4d2588d45877d0e85988c2aa02d38a20dbf22ae9b26e8`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28navigation%29/accordion.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(navigation)/accordion.mdx`; SHA-256 `09fc44d7a9df83a312b4d2588d45877d0e85988c2aa02d38a20dbf22ae9b26e8`.
- **Saved reader acquisition:** `docs/components/accordion.mdx`; 33,626 bytes; SHA-256 `2e3f142dc1ae48498fc24215d2ad86dce59b265956fe5a8e33a5627dc4a4e9fe`.
- **Finding:** Accordion is documented as Item/Heading/Trigger/Indicator/Panel/Body composition. Group expansion is key-based, single-expanded by default, with an optional multiple-expanded mode; individual items also expose boolean expansion control. Public variants are default and surface, whereas the styling guidance names an outline modifier without explaining the mapping.
- **Finding lines:** `23-42, 123-125, 146-147, 164-190` in the reviewed text.
- **Documentation caveat (lines 46-51, 123-125, 146-147, 173-173):** The global CSS example and Variant Classes section use .accordion--outline and call it an outline variant, but the public variant union is only default | surface and the example heading is Surface. The text does not explain whether outline maps to either public variant; this is a documentation naming discrepancy, not evidence of an implementation defect.

### 019. [components/alert](https://heroui.com/en/docs/react/components/alert)

- **Group / pass:** `components` / `components-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(feedback)/alert.mdx` — `pinned-source-mdx`, 3,380 bytes.
- **Full-read lines:** `1-130`; **delivery chunks:** `1-130`.
- **Reviewed SHA-256:** `73938bc101b43c32d2bd09ee2504dce849ac395f4c8bd6cca8578449d331bfb9`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28feedback%29/alert.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(feedback)/alert.mdx`; SHA-256 `73938bc101b43c32d2bd09ee2504dce849ac395f4c8bd6cca8578449d331bfb9`.
- **Saved reader acquisition:** `docs/components/alert.mdx`; 8,796 bytes; SHA-256 `5b8c78114b5951c09e73283e8fe4fe0815c7f856a4ad0db2ae704f79759445c9`.
- **Finding:** Alert is documented as informational, with no interactive states on its base; buttons or close buttons can be composed inside it. Its Indicator and Content/Title/Description parts are explicit, status defaults to default among five statuses, and the indicator defaults to the status icon unless children supply a custom icon.
- **Finding lines:** `21-35, 79-105` in the reviewed text.

### 020. [components/alert-dialog](https://heroui.com/en/docs/react/components/alert-dialog)

- **Group / pass:** `components` / `components-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(overlays)/alert-dialog.mdx` — `pinned-source-mdx`, 10,858 bytes.
- **Full-read lines:** `1-294`; **delivery chunks:** `1-200, 201-294`.
- **Reviewed SHA-256:** `20e4c61dea01b234c59345203021c686eb347af9880328012d43f73c01a7417e`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28overlays%29/alert-dialog.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(overlays)/alert-dialog.mdx`; SHA-256 `20e4c61dea01b234c59345203021c686eb347af9880328012d43f73c01a7417e`.
- **Saved reader acquisition:** `docs/components/alert-dialog.mdx`; 46,677 bytes; SHA-256 `55a3de382e3ca72b377d3bf71efdca2c39703e28330c046ed54d950ee7955e4d`.
- **Finding:** AlertDialog documents controlled open state and dismissal policy on Backdrop: isDismissable defaults false and isKeyboardDismissDisabled defaults true, requiring explicit action. Container owns placement/size; Dialog defaults to role=alertdialog and accepts a close render function; Icon defaults to danger. Accessibility prose promises focus containment and body scroll lock, with ESC closing only when enabled.
- **Finding lines:** `191-220, 250-255, 282-290` in the reviewed text.

### 021. [components/autocomplete](https://heroui.com/en/docs/react/components/autocomplete)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(pickers)/autocomplete.mdx` — `pinned-source-mdx`, 17,867 bytes.
- **Full-read lines:** `1-387`; **delivery chunks:** `1-387`.
- **Reviewed SHA-256:** `0bf8d18ebb3d003be3285dcd898cddb3ea84f3d57c4d1fd07f45a95edaf1df29`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28pickers%29/autocomplete.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(pickers)/autocomplete.mdx`; SHA-256 `0bf8d18ebb3d003be3285dcd898cddb3ea84f3d57c4d1fd07f45a95edaf1df29`.
- **Saved reader acquisition:** `docs/components/autocomplete.mdx`; 93,136 bytes; SHA-256 `873a6461c418ef9ce6a5ca51a9c14cbeca6238e3af42afd5a569d060c2c092e1`.
- **Finding:** Autocomplete is a select-style picker with search inside its popup; it is distinct from the editable ComboBox and supports a composed ListBox/Virtualizer path.
- **Finding lines:** `1-387` in the reviewed text.

### 022. [components/avatar](https://heroui.com/en/docs/react/components/avatar)

- **Group / pass:** `components` / `components-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(media)/avatar.mdx` — `pinned-source-mdx`, 4,378 bytes.
- **Full-read lines:** `1-144`; **delivery chunks:** `1-144`.
- **Reviewed SHA-256:** `bb205a45eb048d76b0998dd4d73e13acf716e4538f388d3296e0c140f312029e`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28media%29/avatar.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(media)/avatar.mdx`; SHA-256 `bb205a45eb048d76b0998dd4d73e13acf716e4538f388d3296e0c140f312029e`.
- **Saved reader acquisition:** `docs/components/avatar.mdx`; 12,337 bytes; SHA-256 `c3188566fa144ee78dcf57ab60096482397cffaa316019642805bfc1ef330d5f`.
- **Finding:** Avatar.Image documents asChild composition with a custom image such as Next.js Image, and specifically requires src on Avatar.Image to track loading and retain fallback until ready. Its API exposes responsive image attributes, alt, load/error handlers, crossOrigin, and native loading; Fallback supports delayMs to prevent flashing and a parent-color override.
- **Finding lines:** `53-57, 119-140` in the reviewed text.

### 023. [components/avatar-group](https://heroui.com/en/docs/react/components/avatar-group)

- **Group / pass:** `components` / `components-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(media)/avatar-group.mdx` — `pinned-source-mdx`, 4,896 bytes.
- **Full-read lines:** `1-136`; **delivery chunks:** `1-136`.
- **Reviewed SHA-256:** `d1df4288039965fd625edde8ce47ec4a80221394c5a75dc7437fab715490adb1`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28media%29/avatar-group.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(media)/avatar-group.mdx`; SHA-256 `d1df4288039965fd625edde8ce47ec4a80221394c5a75dc7437fab715490adb1`.
- **Saved reader acquisition:** `docs/components/avatar-group.mdx`; 17,181 bytes; SHA-256 `86eb1e1bd5edb84d862620fbc80cbf10bcd6a8aeb1c0a74167a4c6e287655aec`.
- **Finding:** AvatarGroup documents size/color/variant inheritance for direct Avatar children that omit those props. max truncates avatars and auto-counts the remainder; an explicit Count is not truncated, suppresses automatic counting, and replaces the removed v2 total prop for a known total. Grid disables overlap; stacked overlap defaults to clip. Meaningful stacks require the consumer to add role=group and an accessible label because no group role is supplied by default.
- **Finding lines:** `89-96, 100-132` in the reviewed text.

### 024. [components/badge](https://heroui.com/en/docs/react/components/badge)

- **Group / pass:** `components` / `components-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(data-display)/badge.mdx` — `pinned-source-mdx`, 5,375 bytes.
- **Full-read lines:** `1-187`; **delivery chunks:** `1-187`.
- **Reviewed SHA-256:** `e92afbaccf05c391b893b96a71b80f806ba524fefc7bb9f32e8ffa1d79d22abd`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28data-display%29/badge.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(data-display)/badge.mdx`; SHA-256 `e92afbaccf05c391b893b96a71b80f806ba524fefc7bb9f32e8ffa1d79d22abd`.
- **Saved reader acquisition:** `docs/components/badge.mdx`; 13,357 bytes; SHA-256 `82939b4cedc3036f74fba016c3aa1269750b1aae36adf1810114fc5f6a559cb8`.
- **Finding:** Badge is an anchored indicator: Badge.Anchor contains the target and Badge, plain-text children are automatically wrapped in Badge.Label, and omitting children is documented to render a dot. The page directs standalone labels to Chip. API defaults are variant=primary, color=default, size=md, and placement=top-right.
- **Finding lines:** `22-33, 61-75, 158-183` in the reviewed text.

### 025. [components/breadcrumbs](https://heroui.com/en/docs/react/components/breadcrumbs)

- **Group / pass:** `components` / `components-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(navigation)/breadcrumbs.mdx` — `pinned-source-mdx`, 3,986 bytes.
- **Full-read lines:** `1-151`; **delivery chunks:** `1-151`.
- **Reviewed SHA-256:** `3d4cf864fafff32a12e38f644728f12effbc2909786a5f1b2524658fe27baeb0`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28navigation%29/breadcrumbs.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(navigation)/breadcrumbs.mdx`; SHA-256 `3d4cf864fafff32a12e38f644728f12effbc2909786a5f1b2524658fe27baeb0`.
- **Saved reader acquisition:** `docs/components/breadcrumbs.mdx`; 8,581 bytes; SHA-256 `00f5a48c3256feb45cf4b82d2a474129da6f3036ad43ffa7af198c542dc659c9`.
- **Finding:** Breadcrumbs documents the final item without href as the automatic current-page indicator, with aria-current=page and a data-current styling hook. The root supplies a customizable separator (chevron-right by default) and group-wide disabling, while root and item each expose DOM render overrides; accessibility support is attributed to the React Aria Breadcrumbs primitive.
- **Finding lines:** `106-115, 119-147` in the reviewed text.

### 026. [components/button](https://heroui.com/en/docs/react/components/button)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `docs/components/button.mdx` — `expanded-browser-reader`, 13,976 bytes.
- **Full-read lines:** `1-508`; **delivery chunks:** `1-508`.
- **Reviewed SHA-256:** `4b73753e081fc3ddb23c5716cb4aa5cdcdb1c4b990618100ce867b513b1bdf79`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28buttons%29/button.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(buttons)/button.mdx`; SHA-256 `5095d1972c4f84a881e25b5be55868545687f0f39b2ef2489e3d80a8a4bd216f`.
- **Saved reader acquisition:** `docs/components/button.mdx`; 13,976 bytes; SHA-256 `4b73753e081fc3ddb23c5716cb4aa5cdcdb1c4b990618100ce867b513b1bdf79`.
- **Finding:** Button exposes semantic emphasis variants, string/function classes, and custom rendering; the expanded reader includes its examples. Styling a replacement element still requires preserving the supplied behavior and props.
- **Finding lines:** `1-508` in the reviewed text.

### 027. [components/button-group](https://heroui.com/en/docs/react/components/button-group)

- **Group / pass:** `components` / `components-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(buttons)/button-group.mdx` — `pinned-source-mdx`, 4,671 bytes.
- **Full-read lines:** `1-167`; **delivery chunks:** `1-167`.
- **Reviewed SHA-256:** `dbadf4727135f8d0bf6cfac3bf55d61cbb0cf4aad50404455ece30bae734d54b`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28buttons%29/button-group.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(buttons)/button-group.mdx`; SHA-256 `dbadf4727135f8d0bf6cfac3bf55d61cbb0cf4aad50404455ece30bae734d54b`.
- **Saved reader acquisition:** `docs/components/button-group.mdx`; 22,970 bytes; SHA-256 `4e8122fea037d8cb9fb4e0c6dd4655b9cb020e854a372d24afd5f89dafda5474`.
- **Finding:** ButtonGroup documents context propagation of size/variant/isDisabled to direct Button children only, explicitly excluding buttons nested in other components; an individual isDisabled=false can override group disabling. Separators are opt-in children inside each button except the first. Horizontal/vertical layout, automatic edge radii, and removal of grouped buttons' pressed scale transform are documented.
- **Finding lines:** `22-42, 128-146, 156-163` in the reviewed text.

### 028. [components/calendar](https://heroui.com/en/docs/react/components/calendar)

- **Group / pass:** `components` / `components-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(date-and-time)/calendar.mdx` — `pinned-source-mdx`, 12,430 bytes.
- **Full-read lines:** `1-286`; **delivery chunks:** `1-200, 201-286`.
- **Reviewed SHA-256:** `e9fd23dbabab73a6d922a44557ab2101e321b10e1aff1ad253a2c489be307651`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28date-and-time%29/calendar.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(date-and-time)/calendar.mdx`; SHA-256 `e9fd23dbabab73a6d922a44557ab2101e321b10e1aff1ad253a2c489be307651`.
- **Saved reader acquisition:** `docs/components/calendar.mdx`; 43,076 bytes; SHA-256 `5a4dcb0efdd88ad7328b70fe8b842463fc15a730e11e447a478f23b43ce7c592`.
- **Finding:** Calendar documents single or multiple selection (date arrays for multiple), month/week/day visible durations with visible-range or single-unit paging, and separate controlled focus and year-picker state. Default min/max are calendar-aware 1900-01-01 and 2099-12-31. Display follows locale, but onChange retains the calendar system of value/defaultValue, falling back to Gregorian without a value. Year-picker parts expose label formatting and a configurable visible-years window.
- **Finding lines:** `58-106, 122-140, 205-230, 252-261` in the reviewed text.

### 029. [components/card](https://heroui.com/en/docs/react/components/card)

- **Group / pass:** `components` / `components-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(layout)/card.mdx` — `pinned-source-mdx`, 5,572 bytes.
- **Full-read lines:** `1-189`; **delivery chunks:** `1-189`.
- **Reviewed SHA-256:** `69e5e742ada44524e2ef29d64efd80a3de720a74384b3f2b7354134d25fffb5c`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28layout%29/card.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(layout)/card.mdx`; SHA-256 `69e5e742ada44524e2ef29d64efd80a3de720a74384b3f2b7354134d25fffb5c`.
- **Saved reader acquisition:** `docs/components/card.mdx`; 26,076 bytes; SHA-256 `27cd1530f4a2422be1bc6e8fa8f8e839968310a4695a0c999985cf513b91e645`.
- **Finding:** Card variants express semantic prominence rather than fixed visuals; both secondary and tertiary are described with surface-tertiary in the prose and class reference, which does not establish distinct fills. Title is documented as h3 and Description as p. Accessibility examples supply a labelled article role and use a native anchor styled with cardVariants().base() for an interactive card.
- **Finding lines:** `39-50, 116-129, 140-152, 168-185` in the reviewed text.

### 030. [components/checkbox](https://heroui.com/en/docs/react/components/checkbox)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `docs/components/checkbox.mdx` — `expanded-browser-reader`, 23,231 bytes.
- **Full-read lines:** `1-667`; **delivery chunks:** `1-667`.
- **Reviewed SHA-256:** `240f8dda449acfce97edd80465888be0411cb3b46f8867ba87a80583db72be26`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/checkbox.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/checkbox.mdx`; SHA-256 `679e9451424b67db2991e8d07d8f32846b72e56e0e15e2219575d19b3fa1e61d`.
- **Saved reader acquisition:** `docs/components/checkbox.mdx`; 23,231 bytes; SHA-256 `240f8dda449acfce97edd80465888be0411cb3b46f8867ba87a80583db72be26`.
- **Finding:** Checkbox separates Content, Indicator, and decorative Control anatomy from the field root, with Label, Description, and FieldError composition; the expanded reader examples were read in full.
- **Finding lines:** `1-667` in the reviewed text.

### 031. [components/checkbox-group](https://heroui.com/en/docs/react/components/checkbox-group)

- **Group / pass:** `components` / `components-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/checkbox-group.mdx` — `pinned-source-mdx`, 4,407 bytes.
- **Full-read lines:** `1-161`; **delivery chunks:** `1-161`.
- **Reviewed SHA-256:** `fc79dc575a323cd3e3cfb2058b6190ce83cb301b2e75ec82259702316e80b909`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/checkbox-group.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/checkbox-group.mdx`; SHA-256 `fc79dc575a323cd3e3cfb2058b6190ce83cb301b2e75ec82259702316e80b909`.
- **Saved reader acquisition:** `docs/components/checkbox-group.mdx`; 19,173 bytes; SHA-256 `72641b5137b4f378dd355341264664939b4d561546cab323fe10ba06eb1a16d7`.
- **Finding:** CheckboxGroup composes shared Label, Description, and FieldError with Checkbox.Content/Control/Indicator; the inline anatomy places the clickable plain-text label inside Content and optional per-checkbox help outside Content. Its React Aria-derived API uses string-array selection, supports a form name and required/disabled/read-only/invalid states, and exposes both children render props and a DOM render override.
- **Finding lines:** `22-43, 128-157` in the reviewed text.

### 032. [components/chip](https://heroui.com/en/docs/react/components/chip)

- **Group / pass:** `components` / `components-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(data-display)/chip.mdx` — `pinned-source-mdx`, 4,129 bytes.
- **Full-read lines:** `1-151`; **delivery chunks:** `1-151`.
- **Reviewed SHA-256:** `bbf5cc3beea1c1d2b3616be3695d973b921b1e5ba0179bb7367e55656dc242e0`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28data-display%29/chip.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(data-display)/chip.mdx`; SHA-256 `bbf5cc3beea1c1d2b3616be3695d973b921b1e5ba0179bb7367e55656dc242e0`.
- **Saved reader acquisition:** `docs/components/chip.mdx`; 10,066 bytes; SHA-256 `85fe572c9d09abd4282067283dce95786a39f578de346264991212e52829582c`.
- **Finding:** Chip documents automatic Chip.Label wrapping for plain-text children and independent color, variant and size props defaulting to default, secondary and md. Its styling reference enumerates predefined colored compound styles for primary and soft variants and describes @layer components overrides for other variant-color combinations.
- **Finding lines:** `21-29, 112-128, 132-147` in the reviewed text.

### 033. [components/close-button](https://heroui.com/en/docs/react/components/close-button)

- **Group / pass:** `components` / `components-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(buttons)/close-button.mdx` — `pinned-source-mdx`, 3,291 bytes.
- **Full-read lines:** `1-117`; **delivery chunks:** `1-117`.
- **Reviewed SHA-256:** `0f1f9158c81d5c9124aee2025cd30ec313a27bb58fceda2d98e652a57c12330e`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28buttons%29/close-button.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(buttons)/close-button.mdx`; SHA-256 `0f1f9158c81d5c9124aee2025cd30ec313a27bb58fceda2d98e652a57c12330e`.
- **Saved reader acquisition:** `docs/components/close-button.mdx`; 5,084 bytes; SHA-256 `49123af1fca52cf933834d4f9a89c69f581daec8c5a7265ee65c461cd91916f7`.
- **Finding:** CloseButton is documented as extending React Aria Button, with one default variant, replaceable node/function children defaulting to CloseIcon, onPress and isDisabled. The page explicitly lists accessible naming/description props, hover/press/focus/disabled render values, and pseudo-class or attribute hooks for styling those interaction states.
- **Finding lines:** `74-81, 85-113` in the reviewed text.

### 034. [components/color-area](https://heroui.com/en/docs/react/components/color-area)

- **Group / pass:** `components` / `components-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(colors)/color-area.mdx` — `pinned-source-mdx`, 3,988 bytes.
- **Full-read lines:** `1-144`; **delivery chunks:** `1-144`.
- **Reviewed SHA-256:** `7eb35fe09b83df77ecd41de793faffc9393cab9435433e113028f2d0d5b5d43a`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28colors%29/color-area.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(colors)/color-area.mdx`; SHA-256 `7eb35fe09b83df77ecd41de793faffc9393cab9435433e113028f2d0d5b5d43a`.
- **Saved reader acquisition:** `docs/components/color-area.mdx`; 12,799 bytes; SHA-256 `1e8ae857d3c847fcb243dd560c3b3ca50afb85e79a1ce25cea7be17b2210c072`.
- **Finding:** ColorArea composes an explicit Thumb for two-dimensional selection, with saturation/brightness as the documented horizontal/vertical defaults and configurable RGB, HSL or HSB channels. value/defaultValue accept string or Color, but callbacks return Color: onChange during dragging and onChangeEnd when dragging stops. The precision dot overlay is opt-in through showDots, default false.
- **Finding lines:** `22-32, 42-48, 120-132` in the reviewed text.

### 035. [components/color-field](https://heroui.com/en/docs/react/components/color-field)

- **Group / pass:** `components` / `components-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(colors)/color-field.mdx` — `pinned-source-mdx`, 13,012 bytes.
- **Full-read lines:** `1-388`; **delivery chunks:** `1-200, 201-388`.
- **Reviewed SHA-256:** `20c6706117fcb24c7e2a5be229da44eb71430db5a22c6338a2587aeae9fb53d6`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28colors%29/color-field.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(colors)/color-field.mdx`; SHA-256 `20c6706117fcb24c7e2a5be229da44eb71430db5a22c6338a2587aeae9fb53d6`.
- **Saved reader acquisition:** `docs/components/color-field.mdx`; 28,175 bytes; SHA-256 `05e0d8120239ab79b6f33f2269cb456f5e4bf18352c1c94bf74437f3e648a346`.
- **Finding:** ColorField documents Color | null for both value/defaultValue and onChange, hex editing unless channel is supplied, and native validation by default. Shared Label, Description and FieldError compose around Group/Input; primary/secondary visual variants are configured on Group, with secondary recommended on surfaces. Invalid state is documented to hide the description slot. Inline examples obtain Color objects using parseColor from @heroui/react.
- **Finding lines:** `19-39, 43-54, 147-154, 173-195, 256-275, 292-310` in the reviewed text.

### 036. [components/color-picker](https://heroui.com/en/docs/react/components/color-picker)

- **Group / pass:** `components` / `components-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(colors)/color-picker.mdx` — `pinned-source-mdx`, 4,989 bytes.
- **Full-read lines:** `1-187`; **delivery chunks:** `1-187`.
- **Reviewed SHA-256:** `4ec62720bda31f39553a98385c8de1cac96174b205734d730dfe40f92fe041c1`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28colors%29/color-picker.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(colors)/color-picker.mdx`; SHA-256 `4ec62720bda31f39553a98385c8de1cac96174b205734d730dfe40f92fe041c1`.
- **Saved reader acquisition:** `docs/components/color-picker.mdx`; 16,943 bytes; SHA-256 `7fc57cc7e62a59c0f37100548619761313410cf5bb12776ac01a0185d773f93f`.
- **Finding:** ColorPicker is documented as synchronizing color value between composed controls. Its inline anatomy shows a swatch-and-label Trigger and a Popover containing explicit ColorArea/Thumb and ColorSlider/Track/Thumb parts. Root values accept string or Color and onChange returns Color; the popover defaults to bottom left. The page also explains channel fields and multiple sliders, and lists Color formatting/channel methods, including methods returning new Color objects.
- **Finding lines:** `1-9, 29-54, 70-84, 135-173` in the reviewed text.

### 037. [components/color-slider](https://heroui.com/en/docs/react/components/color-slider)

- **Group / pass:** `components` / `components-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(colors)/color-slider.mdx` — `pinned-source-mdx`, 6,855 bytes.
- **Full-read lines:** `1-220`; **delivery chunks:** `1-200, 201-220`.
- **Reviewed SHA-256:** `8d9bb9b3c23d2adb01370272ea034bbdded0f90f8ff5b48d4ec647bb524e2fc5`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28colors%29/color-slider.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(colors)/color-slider.mdx`; SHA-256 `8d9bb9b3c23d2adb01370272ea034bbdded0f90f8ff5b48d4ec647bb524e2fc5`.
- **Saved reader acquisition:** `docs/components/color-slider.mdx`; 16,204 bytes; SHA-256 `0dd4e6de86605db1e3a8bffb229835e30259a693ebcdde97b3b69100569b28f6`.
- **Finding:** ColorSlider composes Output, Track and Thumb to edit one color channel, defaults colorSpace to the value's space, and separates continuous onChange from drag-ending onChangeEnd. Horizontal is the default orientation, with vertical supported; the alpha channel is documented to show a transparency checkerboard. The accessibility section explicitly claims Arrow/Home/End/Page-key support, locale-aware value formatting and HTML form integration through hidden inputs.
- **Finding lines:** `23-37, 66-80, 155-169, 205-214` in the reviewed text.

### 038. [components/color-swatch](https://heroui.com/en/docs/react/components/color-swatch)

- **Group / pass:** `components` / `components-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(colors)/color-swatch.mdx` — `pinned-source-mdx`, 3,572 bytes.
- **Full-read lines:** `1-133`; **delivery chunks:** `1-133`.
- **Reviewed SHA-256:** `28a9f2dadc112a6df7fcc583fe3b837471deffe28f66d485bc7e6104c53788e2`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28colors%29/color-swatch.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(colors)/color-swatch.mdx`; SHA-256 `28a9f2dadc112a6df7fcc583fe3b837471deffe28f66d485bc7e6104c53788e2`.
- **Saved reader acquisition:** `docs/components/color-swatch.mdx`; 8,831 bytes; SHA-256 `65a897f43e6902ea9ef65a4530c1c762cdb752761d91859ce62b0a51cdf498e6`.
- **Finding:** ColorSwatch documents a transparency checkerboard, circle/md defaults (32px), and five sizes from 16px to 40px. Accessibility distinguishes colorName, which overrides the generated color description, from aria-label, which can add usage context. A style render function receives the Color object, with string-formatting and alpha-channel access illustrated in the text.
- **Finding lines:** `41-54, 84-110, 113-129` in the reviewed text.

### 039. [components/color-swatch-picker](https://heroui.com/en/docs/react/components/color-swatch-picker)

- **Group / pass:** `components` / `components-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(colors)/color-swatch-picker.mdx` — `pinned-source-mdx`, 5,931 bytes.
- **Full-read lines:** `1-212`; **delivery chunks:** `1-200, 201-212`.
- **Reviewed SHA-256:** `9a9d4c8a0256e6bb70071b42ba4507affde1372687260687b061fff360996fc5`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28colors%29/color-swatch-picker.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(colors)/color-swatch-picker.mdx`; SHA-256 `9a9d4c8a0256e6bb70071b42ba4507affde1372687260687b061fff360996fc5`.
- **Saved reader acquisition:** `docs/components/color-swatch-picker.mdx`; 14,115 bytes; SHA-256 `b24fa7724dcd481bc23b20378f7c7a686410d028bb3dd4f5a1377cdd4a8f72dc`.
- **Finding:** ColorSwatchPicker's anatomy composes Item, Swatch and Indicator for a predefined palette; each Item requires color and can be disabled. The root accepts string or Color selections and returns Color through onChange, with md/circle/grid defaults and an alternative vertical stack layout. Hover scaling is documented only for unselected items. The page explicitly states that parseColor is re-exported from React Aria Components.
- **Finding lines:** `22-43, 146-157, 161-185, 193-208` in the reviewed text.

### 040. [components/combo-box](https://heroui.com/en/docs/react/components/combo-box)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(pickers)/combo-box.mdx` — `pinned-source-mdx`, 12,734 bytes.
- **Full-read lines:** `1-372`; **delivery chunks:** `1-372`.
- **Reviewed SHA-256:** `d928de4b4e52510313dff646194933f4247e7852781c2ff4d7bf7bc10701d7a9`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28pickers%29/combo-box.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(pickers)/combo-box.mdx`; SHA-256 `d928de4b4e52510313dff646194933f4247e7852781c2ff4d7bf7bc10701d7a9`.
- **Saved reader acquisition:** `docs/components/combo-box.mdx`; 64,150 bytes; SHA-256 `b782ee4c8189d09664a0abd565d9012ba034b96d8ae866451031bd82f2da4f31`.
- **Finding:** ComboBox combines an editable input with suggestion selection and filtering; free typing and selected-item state are separate contracts rather than a synonym for Autocomplete.
- **Finding lines:** `1-372` in the reviewed text.

### 041. [components/date-field](https://heroui.com/en/docs/react/components/date-field)

- **Group / pass:** `components` / `components-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(date-and-time)/date-field.mdx` — `pinned-source-mdx`, 16,594 bytes.
- **Full-read lines:** `1-455`; **delivery chunks:** `1-200, 201-400, 401-455`.
- **Reviewed SHA-256:** `194f28b419c60216c280840381990280319f320844f4caac8106ceffdc1170e1`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28date-and-time%29/date-field.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(date-and-time)/date-field.mdx`; SHA-256 `194f28b419c60216c280840381990280319f320844f4caac8106ceffdc1170e1`.
- **Saved reader acquisition:** `docs/components/date-field.mdx`; 37,852 bytes; SHA-256 `03c633f6407a34b2d058a05fa973e6b180655eb2f8483c4f446896a534cfc54c`.
- **Finding:** DateField uses explicit Input/Segment composition and documents DateValue | null values from @internationalized/date, native validation by default, locale-derived hour cycle, and ISO 8601 form submission through name. Both Group and Input list primary/secondary variants. InputContainer is a horizontally scrollable wrapper for multiple inputs, supporting range composition. Invalid state is documented to hide the shared Description slot.
- **Finding lines:** `20-39, 161-168, 187-215, 224-230, 320-357, 421-426` in the reviewed text.

### 042. [components/date-picker](https://heroui.com/en/docs/react/components/date-picker)

- **Group / pass:** `components` / `components-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(date-and-time)/date-picker.mdx` — `pinned-source-mdx`, 7,155 bytes.
- **Full-read lines:** `1-203`; **delivery chunks:** `1-200, 201-203`.
- **Reviewed SHA-256:** `27d33430efb98ec2bde3557422de33b358bb1e226dbf4039290fd9e07e14f145`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28date-and-time%29/date-picker.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(date-and-time)/date-picker.mdx`; SHA-256 `27d33430efb98ec2bde3557422de33b358bb1e226dbf4039290fd9e07e14f145`.
- **Saved reader acquisition:** `docs/components/date-picker.mdx`; 33,592 bytes; SHA-256 `b98925d15828eac8ff196c41463f1b234118530ee818701393c700455c3b0db2`.
- **Finding:** DatePicker explicitly composes DateField.Group/Input and Calendar in a Popover, with its Trigger inside DateField.Suffix and a replaceable default IconCalendar indicator. Selected value and popover open state have separate controlled APIs. Display follows locale or an I18nProvider calendar override, while onChange is documented to preserve the value/defaultValue calendar system, or use Gregorian when neither supplies a value, regardless of displayed locale.
- **Finding lines:** `21-61, 87-107, 171-194` in the reviewed text.

### 043. [components/date-range-picker](https://heroui.com/en/docs/react/components/date-range-picker)

- **Group / pass:** `components` / `components-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(date-and-time)/date-range-picker.mdx` — `pinned-source-mdx`, 8,196 bytes.
- **Full-read lines:** `1-216`; **delivery chunks:** `1-200, 201-216`.
- **Reviewed SHA-256:** `e13df7bae46bb5d9396014e0388f507d0e342ccb24217813cb77b5275feb961f`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28date-and-time%29/date-range-picker.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(date-and-time)/date-range-picker.mdx`; SHA-256 `e13df7bae46bb5d9396014e0388f507d0e342ccb24217813cb77b5275feb961f`.
- **Saved reader acquisition:** `docs/components/date-range-picker.mdx`; 41,652 bytes; SHA-256 `189ec20f0d6b83cb86ff4fc4a6a6527e3432d3f82e450c336de9aee404244e5f`.
- **Finding:** DateRangePicker's inline anatomy places start/end DateField.Input slots and RangeSeparator inside DateField.InputContainer, with RangeCalendar in the Popover. Its nullable controlled value contains start and end DateValue entries; startName/endName provide separate HTML form names and popover state is independently controlled. As with the single-date picker, onChange is documented to preserve the input calendar system rather than the displayed locale's calendar, with Gregorian as the no-value fallback.
- **Finding lines:** `21-67, 105-113, 180-207` in the reviewed text.

### 044. [components/description](https://heroui.com/en/docs/react/components/description)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/description.mdx` — `pinned-source-mdx`, 2,409 bytes.
- **Full-read lines:** `1-97`; **delivery chunks:** `1-97`.
- **Reviewed SHA-256:** `9713f033134e956e2d8ac78fb3d31534211289069a93ee8948875093b679e5fc`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/description.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/description.mdx`; SHA-256 `9713f033134e956e2d8ac78fb3d31534211289069a93ee8948875093b679e5fc`.
- **Saved reader acquisition:** `docs/components/description.mdx`; 3,731 bytes; SHA-256 `64f03b9e706a2ca87ccd88d62f3f953e0a7ab9482551fb137e3344960f263695`.
- **Finding:** Standalone Input examples wire aria-describedby explicitly, while composition inside TextField automatically associates the Description and Label.
- **Finding lines:** `1-97` in the reviewed text.

### 045. [components/disclosure](https://heroui.com/en/docs/react/components/disclosure)

- **Group / pass:** `components` / `components-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(navigation)/disclosure.mdx` — `pinned-source-mdx`, 4,056 bytes.
- **Full-read lines:** `1-146`; **delivery chunks:** `1-146`.
- **Reviewed SHA-256:** `676f3ac44d6310b0e56ccdbe4ffc681b40114e5b1343600a862a415019a546eb`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28navigation%29/disclosure.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(navigation)/disclosure.mdx`; SHA-256 `676f3ac44d6310b0e56ccdbe4ffc681b40114e5b1343600a862a415019a546eb`.
- **Saved reader acquisition:** `docs/components/disclosure.mdx`; 10,321 bytes; SHA-256 `d1e3fffba777a9b466f0a8f2530e958813803aad40403b59ddf9eff711412011`.
- **Finding:** Disclosure composes Heading, Trigger, Indicator and Content, with isExpanded/onExpandedChange controlling expansion and isDisabled controlling the disabled state. The page lists isExpanded/isDisabled render values, indicator rotation via data-expanded, trigger focus hooks, and custom DOM render functions for root/content. Its interactive-state list contains a wording inconsistency: the entry labeled Hidden instead specifies aria-hidden=false for visibility.
- **Finding lines:** `23-38, 94-114, 123-138` in the reviewed text.
- **Documentation caveat (lines 101-101):** The interactive-state entry is labeled Hidden, but the same line uses [aria-hidden="false"] and says 'on content for visibility'. The label describes a hidden state while its selector/prose describe the non-hidden state.

### 046. [components/disclosure-group](https://heroui.com/en/docs/react/components/disclosure-group)

- **Group / pass:** `components` / `components-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(navigation)/disclosure-group.mdx` — `pinned-source-mdx`, 3,359 bytes.
- **Full-read lines:** `1-121`; **delivery chunks:** `1-121`.
- **Reviewed SHA-256:** `c170071a9aa9bfe527bc10f0c3f3f452615a401f56f707246e263d0622ec9e0f`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28navigation%29/disclosure-group.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(navigation)/disclosure-group.mdx`; SHA-256 `c170071a9aa9bfe527bc10f0c3f3f452615a401f56f707246e263d0622ec9e0f`.
- **Saved reader acquisition:** `docs/components/disclosure-group.mdx`; 14,256 bytes; SHA-256 `5eeb9ebe283a0936a680b191080ab1e8c3078d9e640888b6464afe31ec6a5e19`.
- **Finding:** DisclosureGroup documents controlled expandedKeys as Set<Key> with onExpandedChange, uncontrolled defaultExpandedKeys as Iterable<Key>, single-item expansion by default, and group-wide disabling. Its styling reference says it manages child Disclosure data-expanded states.
- **Finding lines:** `43-50, 85-113` in the reviewed text.

### 047. [components/drawer](https://heroui.com/en/docs/react/components/drawer)

- **Group / pass:** `components` / `components-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(overlays)/drawer.mdx` — `pinned-source-mdx`, 9,673 bytes.
- **Full-read lines:** `1-277`; **delivery chunks:** `1-160, 161-277`.
- **Reviewed SHA-256:** `b63343f3ba060bbcd776c3dae6ab2eaca3262389b9678cf8d89e3117f9057ef8`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28overlays%29/drawer.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(overlays)/drawer.mdx`; SHA-256 `b63343f3ba060bbcd776c3dae6ab2eaca3262389b9678cf8d89e3117f9057ef8`.
- **Saved reader acquisition:** `docs/components/drawer.mdx`; 23,623 bytes; SHA-256 `d7f79510a6252292f4e4cb8e520ef896805289ffd3260c004fb83769097afea8`.
- **Finding:** Drawer documents native scrolling in Drawer.Body with body-area drag dismissal excluded, while handle/header/footer support drag gestures. Backdrop owns separate outside-click and keyboard-dismissal controls; Content owns placement, defaulting to bottom. Non-dismissable prose and keyboard-dismissal wording are not internally consistent.
- **Finding lines:** `51-61, 179-195, 265-273` in the reviewed text.
- **Documentation caveat (lines 51-55, 179-188, 265-273):** The Non-Dismissable section says setting only isDismissable=false means the user must use action buttons. The API instead describes isDismissable as backdrop-click control and separately lists isKeyboardDismissDisabled=false, while Accessibility says ESC closes 'when dismissable'. These statements do not consistently explain keyboard dismissal; this is a documentation inconsistency, not verified runtime behavior.

### 048. [components/dropdown](https://heroui.com/en/docs/react/components/dropdown)

- **Group / pass:** `components` / `components-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(collections)/dropdown.mdx` — `pinned-source-mdx`, 12,503 bytes.
- **Full-read lines:** `1-380`; **delivery chunks:** `1-160, 161-310, 311-380`.
- **Reviewed SHA-256:** `d55a115a77a963cd374c3f1b0ee84c67c016adb4e650b755e2de4ab5a43d32fb`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28collections%29/dropdown.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(collections)/dropdown.mdx`; SHA-256 `d55a115a77a963cd374c3f1b0ee84c67c016adb4e650b755e2de4ab5a43d32fb`.
- **Saved reader acquisition:** `docs/components/dropdown.mdx`; 51,232 bytes; SHA-256 `d5c185b0c217837deeaedb2647084ea6aed9fbf142c3dcd8f67e993dbf8563a6`.
- **Finding:** Dropdown explicitly composes Menu, MenuItem, and MenuSection. Its root controls open state and press/longPress triggering; Dropdown.Menu defaults to selectionMode=none and exposes onAction, while Dropdown.Section also exposes its own selection mode, keys, and change callback. Nested SubmenuTrigger composition and ARIA-menu keyboard navigation are documented.
- **Finding lines:** `21-59, 207-238, 252-309, 345-374` in the reviewed text.

### 049. [components/error-message](https://heroui.com/en/docs/react/components/error-message)

- **Group / pass:** `components` / `components-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/error-message.mdx` — `pinned-source-mdx`, 3,596 bytes.
- **Full-read lines:** `1-111`; **delivery chunks:** `1-111`.
- **Reviewed SHA-256:** `21fa844470ca6e13376dcd0d9db935cd48b702ea56570e8126e6d00daf1c0c16`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/error-message.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/error-message.mdx`; SHA-256 `21fa844470ca6e13376dcd0d9db935cd48b702ea56570e8126e6d00daf1c0c16`.
- **Saved reader acquisition:** `docs/components/error-message.mdx`; 5,810 bytes; SHA-256 `5e9d8d56b1dc959dbbc99a0f38fa67c3c8960feff0de780cbcd7e32e8c08bb41`.
- **Finding:** ErrorMessage is explicitly a low-level React Aria Text with slot=errorMessage for non-form contexts such as TagGroup and Calendar, with no form integration. The page recommends FieldError for form fields because it provides form-specific validation and automatic error handling; its own styling reference includes danger color and truncation.
- **Finding lines:** `20-20, 37-51, 77-98` in the reviewed text.

### 050. [components/field-error](https://heroui.com/en/docs/react/components/field-error)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/field-error.mdx` — `pinned-source-mdx`, 3,496 bytes.
- **Full-read lines:** `1-145`; **delivery chunks:** `1-145`.
- **Reviewed SHA-256:** `2e5ea00cdf911b0811cdb34886836dd925d204ce50e2f583a53f2bdc189c867d`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/field-error.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/field-error.mdx`; SHA-256 `2e5ea00cdf911b0811cdb34886836dd925d204ce50e2f583a53f2bdc189c867d`.
- **Saved reader acquisition:** `docs/components/field-error.mdx`; 5,315 bytes; SHA-256 `e0cffdfa51c933ec7a4399d5e35ca4984e19df795122148a4348d10a8acdf9bb`.
- **Finding:** FieldError documents automatic validation feedback and ellipsis truncation; the previously inspected published CSS and bounded runtime instead wrap long error text.
- **Finding lines:** `1-145` in the reviewed text.

### 051. [components/fieldset](https://heroui.com/en/docs/react/components/fieldset)

- **Group / pass:** `components` / `components-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/fieldset.mdx` — `pinned-source-mdx`, 3,484 bytes.
- **Full-read lines:** `1-129`; **delivery chunks:** `1-129`.
- **Reviewed SHA-256:** `9b8c2515f1684034ab87889463d4973d6ddf19c59ff4065f25f0ec82d3387a03`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/fieldset.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/fieldset.mdx`; SHA-256 `9b8c2515f1684034ab87889463d4973d6ddf19c59ff4065f25f0ec82d3387a03`.
- **Saved reader acquisition:** `docs/components/fieldset.mdx`; 12,492 bytes; SHA-256 `e14384e5d2183671a23ee6ab7258355cf847de24862257aa6ccb8b081e2498d8`.
- **Finding:** Fieldset documents separate Legend, Group, and Actions parts for semantic grouping and layout, with nativeProps entries for fieldset/legend/div attributes. Its Surface guidance places variant=secondary on the contained form controls, rather than defining a Fieldset variant.
- **Finding lines:** `18-42, 80-121` in the reviewed text.

### 052. [components/form](https://heroui.com/en/docs/react/components/form)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/form.mdx` — `pinned-source-mdx`, 6,812 bytes.
- **Full-read lines:** `1-174`; **delivery chunks:** `1-174`.
- **Reviewed SHA-256:** `4c43eed877d65f98c79e34a5bd85773a16fbd454b4ce4615b2c079fd7cdb6663`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/form.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/form.mdx`; SHA-256 `4c43eed877d65f98c79e34a5bd85773a16fbd454b4ce4615b2c079fd7cdb6663`.
- **Saved reader acquisition:** `docs/components/form.mdx`; 14,266 bytes; SHA-256 `cb097809961046d58300e7b1e4d16472a327007b217d370c2103a3f17bd87d14`.
- **Finding:** Form composes labeled fields and error feedback around React Aria validation, including native and server-error paths; field relationships remain part of the composed behavior.
- **Finding lines:** `1-174` in the reviewed text.

### 053. [components/input](https://heroui.com/en/docs/react/components/input)

- **Group / pass:** `components` / `components-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/input.mdx` — `pinned-source-mdx`, 4,265 bytes.
- **Full-read lines:** `1-134`; **delivery chunks:** `1-134`.
- **Reviewed SHA-256:** `4d0ed950c090526be96dbf541478da2198e52c55ae83ee52612404e090a33707`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/input.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/input.mdx`; SHA-256 `4d0ed950c090526be96dbf541478da2198e52c55ae83ee52612404e090a33707`.
- **Saved reader acquisition:** `docs/components/input.mdx`; 10,622 bytes; SHA-256 `dd99fe77a77ee4720f07d48f9943a66c5607593675f62f5065308dc854f6e311`.
- **Finding:** Input is documented as the native-attribute primitive: disabled/readOnly/required and an event-based onChange are listed, while labels, validation, isInvalid/isRequired, and error handling are assigned to a surrounding TextField. Its primary variant has a shadow; secondary removes it for Surface backgrounds, and fullWidth defaults to false.
- **Finding lines:** `19-38, 104-130` in the reviewed text.

### 054. [components/input-group](https://heroui.com/en/docs/react/components/input-group)

- **Group / pass:** `components` / `components-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/input-group.mdx` — `pinned-source-mdx`, 13,297 bytes.
- **Full-read lines:** `1-373`; **delivery chunks:** `1-160, 161-310, 311-373`.
- **Reviewed SHA-256:** `6f7c65a56f392233b1d3e2e7314539fe88dd0d32283b32c01f580937bc457cb1`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/input-group.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/input-group.mdx`; SHA-256 `6f7c65a56f392233b1d3e2e7314539fe88dd0d32283b32c01f580937bc457cb1`.
- **Saved reader acquisition:** `docs/components/input-group.mdx`; 34,627 bytes; SHA-256 `1b6ffde35f7a085da730bb8ebe4b876855bc31acbb8b68e956462f8c9bc52b84`.
- **Finding:** InputGroup documents required, disabled, and invalid state inherited from TextField. Its TextArea part switches the group to automatic height and top-aligned prefix/suffix content, reusing the input base class with a textarea data-slot selector. The inline feedback example has an inconsistent 500-character boundary between its predicate/helper text and error message.
- **Finding lines:** `62-72, 126-154, 182-214, 258-279` in the reviewed text.
- **Documentation caveat (lines 189-210):** TextAreaExample sets isInvalid={feedback.length > 500} and displays 'Maximum 500 characters.', so that predicate permits length 500. Its FieldError says 'Feedback must be less than 500 characters', which describes a stricter boundary. This is a contradiction inside the inline example, not a tested component defect.

### 055. [components/input-otp](https://heroui.com/en/docs/react/components/input-otp)

- **Group / pass:** `components` / `components-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/input-otp.mdx` — `pinned-source-mdx`, 8,139 bytes.
- **Full-read lines:** `1-246`; **delivery chunks:** `1-160, 161-246`.
- **Reviewed SHA-256:** `c9e201693bcc1f3a956db2816733be0acd9f2ae235d6f810d9927bfe4fb48b62`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/input-otp.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/input-otp.mdx`; SHA-256 `c9e201693bcc1f3a956db2816733be0acd9f2ae235d6f810d9927bfe4fb48b62`.
- **Saved reader acquisition:** `docs/components/input-otp.mdx`; 24,139 bytes; SHA-256 `35b90f9e37fdb282d61d7efbec4a25014ea2fb62ab67e5171e4f0897b6e0883c`.
- **Finding:** InputOTP explicitly builds on input-otp. Its API requires maxLength and zero-based Slot.index, uses string-valued onChange/onComplete callbacks, and provides validationErrors/validationDetails. Numeric inputMode is a mobile-keyboard default; allowed-character patterns and pasteTransformer are separately documented, with three regex patterns re-exported from @heroui/react.
- **Finding lines:** `19-40, 164-205, 214-242` in the reviewed text.

### 056. [components/kbd](https://heroui.com/en/docs/react/components/kbd)

- **Group / pass:** `components` / `components-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(typography)/kbd.mdx` — `pinned-source-mdx`, 4,273 bytes.
- **Full-read lines:** `1-149`; **delivery chunks:** `1-149`.
- **Reviewed SHA-256:** `0c40b9c8d83df0b0fec613b2328ef289928985f90bc9f4f76a4a019a187ea876`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28typography%29/kbd.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(typography)/kbd.mdx`; SHA-256 `0c40b9c8d83df0b0fec613b2328ef289928985f90bc9f4f76a4a019a187ea876`.
- **Saved reader acquisition:** `docs/components/kbd.mdx`; 10,749 bytes; SHA-256 `82757eec4f7ce9d0cce1d69a0ba04085ea368998e100636836fcb54274f6c80b`.
- **Finding:** Kbd documents shortcut display using Kbd.Abbr with a descriptive title and Kbd.Content for key text, with default/light variants. The API naming is inconsistent: its key-text props are headed Kbd.Key, followed by Kbd.Content Type referring to a keyValue prop that no prop table lists.
- **Finding lines:** `21-32, 99-145` in the reviewed text.
- **Documentation caveat (lines 21-32, 101-105, 125-145):** Anatomy uses Kbd.Content and styling lists kbd__content, but the key-text subcomponent API is headed Kbd.Key. The subsequent Kbd.Content Type section introduces keyValue without a corresponding prop-table entry. The page does not explain whether these names are aliases; this is a documentation naming/coverage mismatch, not evidence that either runtime export is absent.

### 057. [components/label](https://heroui.com/en/docs/react/components/label)

- **Group / pass:** `components` / `components-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/label.mdx` — `pinned-source-mdx`, 3,297 bytes.
- **Full-read lines:** `1-120`; **delivery chunks:** `1-120`.
- **Reviewed SHA-256:** `40b19427887b16580e4c11fe139a59c0bfd3d5bc5929371c37c952eb4e7d9785`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/label.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/label.mdx`; SHA-256 `40b19427887b16580e4c11fe139a59c0bfd3d5bc5929371c37c952eb4e7d9785`.
- **Saved reader acquisition:** `docs/components/label.mdx`; 4,435 bytes; SHA-256 `0cec59b1cb35d61b7709baf00ed7ec0c646cb4b850fd677b588f61eadb5f1564`.
- **Finding:** Label documents native label/htmlFor association and separate isRequired/isDisabled/isInvalid flags for label state. Required-asterisk styling excludes specified group roles and radio/checkbox data slots to avoid duplicate indicators. Its inline Input examples diverge from the assigned Input page's documented prop names and validation placement.
- **Finding lines:** `22-47, 83-116` in the reviewed text.
- **Documentation caveat (lines 31-47):** Label's disabled and invalid examples pass isDisabled and isInvalid directly to Input. The assigned Input page instead documents native disabled and explicitly directs validation props such as isInvalid to TextField with Input as a child. This is a cross-page example/API-guidance mismatch; the texts alone do not establish whether undocumented Input props work at runtime.

### 058. [components/link](https://heroui.com/en/docs/react/components/link)

- **Group / pass:** `components` / `components-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(navigation)/link.mdx` — `pinned-source-mdx`, 5,844 bytes.
- **Full-read lines:** `1-210`; **delivery chunks:** `1-160, 161-210`.
- **Reviewed SHA-256:** `7668f6617bc1759e710a17a013583642bd6019e52aa48690a97e19b165cd3be6`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28navigation%29/link.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(navigation)/link.mdx`; SHA-256 `7668f6617bc1759e710a17a013583642bd6019e52aa48690a97e19b165cd3be6`.
- **Saved reader acquisition:** `docs/components/link.mdx`; 10,460 bytes; SHA-256 `fe2ea683af2ca1ee49031d0421044903b741c18d104c9c23bd531a44dc555f76`.
- **Finding:** Link documents hover-only underlining by default with Tailwind text-decoration customization, an optional built-in arrow icon, and a render prop for overriding the DOM element. Routing examples show applying linkVariants base/icon slots or direct BEM classes to NextLink/native anchors, separating style reuse from use of the Link component itself.
- **Finding lines:** `43-82, 138-206` in the reviewed text.

### 059. [components/list-box](https://heroui.com/en/docs/react/components/list-box)

- **Group / pass:** `components` / `components-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(collections)/list-box.mdx` — `pinned-source-mdx`, 7,713 bytes.
- **Full-read lines:** `1-238`; **delivery chunks:** `1-160, 161-238`.
- **Reviewed SHA-256:** `a9ccb5fda1e9ae66cc39dd58438d1ff08bb2219324877301f0d2d6781b37fc41`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28collections%29/list-box.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(collections)/list-box.mdx`; SHA-256 `a9ccb5fda1e9ae66cc39dd58438d1ff08bb2219324877301f0d2d6781b37fc41`.
- **Saved reader acquisition:** `docs/components/list-box.mdx`; 32,059 bytes; SHA-256 `229ac0933517262d1b103dde73881f299600a039ce654558e87312303b796e7a`.
- **Finding:** ListBox documents single selection by default, root/item DOM-render overrides, and item textValue for accessibility and typeahead. Large-list virtualization is explicitly through Virtualizer; its ListLayout table gives 48px row/header/loader defaults plus estimated row/header heights for variable sizes. The linked virtualization demo implementation was not read.
- **Finding lines:** `69-75, 157-184, 211-232` in the reviewed text.

### 060. [components/meter](https://heroui.com/en/docs/react/components/meter)

- **Group / pass:** `components` / `components-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(feedback)/meter.mdx` — `pinned-source-mdx`, 3,539 bytes.
- **Full-read lines:** `1-149`; **delivery chunks:** `1-149`.
- **Reviewed SHA-256:** `64345446e611592b04563b1f1e109064dcab191b25566daade6544c1f137cd7b`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28feedback%29/meter.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(feedback)/meter.mdx`; SHA-256 `64345446e611592b04563b1f1e109064dcab191b25566daade6544c1f137cd7b`.
- **Saved reader acquisition:** `docs/components/meter.mdx`; 7,401 bytes; SHA-256 `8bd91869129f01056503d2c412881081c8810b8e201a061d8396aa4de190baac`.
- **Finding:** Meter represents a quantity within a known range and composes Label, Output, Track, and Fill. The page requires aria-label when there is no visible label; its API defaults to a 0-100 range, medium size, accent fill, and percent formatting, with percentage and valueText render props for custom output.
- **Finding lines:** `3-3, 24-35, 52-62, 129-145` in the reviewed text.

### 061. [components/modal](https://heroui.com/en/docs/react/components/modal)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(overlays)/modal.mdx` — `pinned-source-mdx`, 9,067 bytes.
- **Full-read lines:** `1-272`; **delivery chunks:** `1-272`.
- **Reviewed SHA-256:** `f6b00da75f574a0bb65dd412896a6a28cd3dd1a576c19c7f3d2b60a729e7fb0d`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28overlays%29/modal.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(overlays)/modal.mdx`; SHA-256 `f6b00da75f574a0bb65dd412896a6a28cd3dd1a576c19c7f3d2b60a729e7fb0d`.
- **Saved reader acquisition:** `docs/components/modal.mdx`; 44,710 bytes; SHA-256 `f72cfa9982dedc32cb930035025c654947a64fc6be12de84a83bb3453b388a76`.
- **Finding:** Modal separates trigger, backdrop, container, dialog, and content parts; dismissal and focus management belong to the overlay contract, not its CSS appearance.
- **Finding lines:** `1-272` in the reviewed text.

### 062. [components/number-field](https://heroui.com/en/docs/react/components/number-field)

- **Group / pass:** `components` / `components-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/number-field.mdx` — `pinned-source-mdx`, 13,511 bytes.
- **Full-read lines:** `1-362`; **delivery chunks:** `1-180, 181-362`.
- **Reviewed SHA-256:** `2471aa0e2cb16f935e602d7910b46c097cbcceb9fea65f82c4271b502509231e`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/number-field.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/number-field.mdx`; SHA-256 `2471aa0e2cb16f935e602d7910b46c097cbcceb9fea65f82c4271b502509231e`.
- **Saved reader acquisition:** `docs/components/number-field.mdx`; 38,305 bytes; SHA-256 `5adc5d7c4ca8bc4bedfe7768ceed7a10b672e88bcd38765afa6730d971492e8f`.
- **Finding:** NumberField composes a Group, numeric Input, and increment/decrement buttons with shared Label, Description, and FieldError. It documents automatic description hiding when invalid, Intl formatting and locale, native validation by default, and a default step of 1; the render-props table explicitly deprecates isFocused in favor of isFocusWithin.
- **Finding lines:** `23-40, 187-195, 217-248, 338-354` in the reviewed text.

### 063. [components/pagination](https://heroui.com/en/docs/react/components/pagination)

- **Group / pass:** `components` / `components-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(navigation)/pagination.mdx` — `pinned-source-mdx`, 6,960 bytes.
- **Full-read lines:** `1-241`; **delivery chunks:** `1-150, 151-241`.
- **Reviewed SHA-256:** `d545b0746b76e02a99bf0ce37accd094012125ec9d0fd6494adacf89e1a74e94`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28navigation%29/pagination.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(navigation)/pagination.mdx`; SHA-256 `d545b0746b76e02a99bf0ce37accd094012125ec9d0fd6494adacf89e1a74e94`.
- **Saved reader acquisition:** `docs/components/pagination.mdx`; 21,524 bytes; SHA-256 `9c01044e4c38a11f0c871e7d33079b9ff017b65911536feb9f944eca8813255b`.
- **Finding:** Pagination is composed from Summary, Content, Item, Link, Previous/Next, and Ellipsis. Despite the Link name, the page explicitly describes React Aria Button-based interactive elements with onPress rather than onClick; current-page and disabled state are supplied on the parts, and accessibility includes a labeled nav, aria-current=page, and aria-hidden ellipses.
- **Finding lines:** `25-51, 191-208, 223-237` in the reviewed text.

### 064. [components/popover](https://heroui.com/en/docs/react/components/popover)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(overlays)/popover.mdx` — `pinned-source-mdx`, 4,271 bytes.
- **Full-read lines:** `1-162`; **delivery chunks:** `1-162`.
- **Reviewed SHA-256:** `101858bb79028cbf6ba6aa84d346bdc0659f3ab68d6a7f44e9f9b97e1cb0b935`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28overlays%29/popover.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(overlays)/popover.mdx`; SHA-256 `101858bb79028cbf6ba6aa84d346bdc0659f3ab68d6a7f44e9f9b97e1cb0b935`.
- **Saved reader acquisition:** `docs/components/popover.mdx`; 14,131 bytes; SHA-256 `850d53481a291ed76a650e667d7c56be3aea5a8b2c488b175deb6c538cb81ddf`.
- **Finding:** Popover composes a trigger, positioned content, optional arrow, and dialog; placement, dismissal, and focus behavior remain connected through React Aria parts.
- **Finding lines:** `1-162` in the reviewed text.

### 065. [components/progress-bar](https://heroui.com/en/docs/react/components/progress-bar)

- **Group / pass:** `components` / `components-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(feedback)/progress-bar.mdx` — `pinned-source-mdx`, 4,133 bytes.
- **Full-read lines:** `1-159`; **delivery chunks:** `1-159`.
- **Reviewed SHA-256:** `7d216771f93cd539cbf31e7cd7a68c49781d24e3a5078ad4243de72fcc81ca1d`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28feedback%29/progress-bar.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(feedback)/progress-bar.mdx`; SHA-256 `7d216771f93cd539cbf31e7cd7a68c49781d24e3a5078ad4243de72fcc81ca1d`.
- **Saved reader acquisition:** `docs/components/progress-bar.mdx`; 12,231 bytes; SHA-256 `3c45edb8953a2d0240091593cf1f11badda18655a255648f2f74e146c8e15822`.
- **Finding:** ProgressBar documents operation progress with Label/Output/Track/Fill composition, aria-label when no visible label is present, and isIndeterminate for unknown progress. The API defaults to a 0-100 range and percent formatting, supports custom valueLabel, and exposes percentage, valueText, and isIndeterminate render props.
- **Finding lines:** `3-3, 24-35, 52-70, 133-155` in the reviewed text.

### 066. [components/progress-circle](https://heroui.com/en/docs/react/components/progress-circle)

- **Group / pass:** `components` / `components-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(feedback)/progress-circle.mdx` — `pinned-source-mdx`, 4,062 bytes.
- **Full-read lines:** `1-155`; **delivery chunks:** `1-155`.
- **Reviewed SHA-256:** `01ea0849793c5bd06d56a44523c1281dfc700e2d9cf771148da3ec47521f9492`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28feedback%29/progress-circle.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(feedback)/progress-circle.mdx`; SHA-256 `01ea0849793c5bd06d56a44523c1281dfc700e2d9cf771148da3ec47521f9492`.
- **Saved reader acquisition:** `docs/components/progress-circle.mdx`; 9,565 bytes; SHA-256 `92970d8df7b9b2b770543c75a350380fcf0a0d0ee5a584dddf1a093ac0b91389`.
- **Finding:** ProgressCircle inherits React Aria ProgressBar semantics while composing an SVG Track with TrackCircle and FillCircle. Its documented customization seam is direct SVG attributes such as strokeWidth, radius, center coordinates, and viewBox; it supports determinate and indeterminate progress and exposes the same percentage/valueText/isIndeterminate render props.
- **Finding lines:** `24-35, 51-71, 108-112, 128-151` in the reviewed text.

### 067. [components/radio-group](https://heroui.com/en/docs/react/components/radio-group)

- **Group / pass:** `components` / `components-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/radio-group.mdx` — `pinned-source-mdx`, 8,347 bytes.
- **Full-read lines:** `1-260`; **delivery chunks:** `1-150, 151-260`.
- **Reviewed SHA-256:** `b820658e436065b03613a0b4efa4b158f311548c2b41d2d093e32a2106e99303`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/radio-group.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/radio-group.mdx`; SHA-256 `b820658e436065b03613a0b4efa4b158f311548c2b41d2d093e32a2106e99303`.
- **Saved reader acquisition:** `docs/components/radio-group.mdx`; 28,215 bytes; SHA-256 `9b6813961e5f361476f8063de7ac3dbc7815d89f8b208715f7707f09847b6d31`.
- **Finding:** RadioGroup's anatomy places the clickable control and label inside Radio.Content, with a sibling Description announced through aria-describedby and both per-radio and group-level FieldError options. Root Radio render props describe field state, while the button-level section describes hover/press/focus state; disabled styling explicitly uses attributes/pseudo-classes rather than a radio--disabled modifier. The Radio.Control children type conflicts with its later render-function instructions.
- **Finding lines:** `24-44, 162-183, 214-252` in the reviewed text.
- **Documentation caveat (lines 214-220, 250-252):** The Radio.Control section says it extends React.HTMLAttributes<HTMLSpanElement> and types children only as React.ReactNode, but the RadioButtonRenderProps section explicitly instructs passing a function as Radio.Control children to access button-level state. The table and usage instruction disagree about accepted children; this is a documentation inconsistency, not a verified implementation defect.

### 068. [components/range-calendar](https://heroui.com/en/docs/react/components/range-calendar)

- **Group / pass:** `components` / `components-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(date-and-time)/range-calendar.mdx` — `pinned-source-mdx`, 13,156 bytes.
- **Full-read lines:** `1-292`; **delivery chunks:** `1-150, 151-292`.
- **Reviewed SHA-256:** `2cc7c636b0aaae675ac00b2671ad76ab218e514cabb405ff4109ee5960eaeb7b`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28date-and-time%29/range-calendar.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(date-and-time)/range-calendar.mdx`; SHA-256 `2cc7c636b0aaae675ac00b2671ad76ab218e514cabb405ff4109ee5960eaeb7b`.
- **Saved reader acquisition:** `docs/components/range-calendar.mdx`; 49,540 bytes; SHA-256 `12118068e5c1c78efe71da88aff5d8072fda2eb367e7292619b6521704aa431c`.
- **Finding:** RangeCalendar documents an anchorDate argument to isDateUnavailable for start-dependent end-date rules, month/week/day visible durations with single-unit or visible-range paging, and optional ranges spanning unavailable dates. Display locale can change the calendar presentation while onChange preserves the value/defaultValue calendar system (Gregorian without an initial value). Its API documents calendar-aware default bounds of 1900-01-01 through 2099-12-31 and controlled/uncontrolled year-picker visibility.
- **Finding lines:** `68-100, 126-140, 211-234` in the reviewed text.

### 069. [components/scroll-shadow](https://heroui.com/en/docs/react/components/scroll-shadow)

- **Group / pass:** `components` / `components-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(utilities)/scroll-shadow.mdx` — `pinned-source-mdx`, 7,013 bytes.
- **Full-read lines:** `1-142`; **delivery chunks:** `1-142`.
- **Reviewed SHA-256:** `bad8cc559f3a1724026c9315387bfd5bd18ee418d97286a961f3c0a6b0051b7e`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28utilities%29/scroll-shadow.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(utilities)/scroll-shadow.mdx`; SHA-256 `bad8cc559f3a1724026c9315387bfd5bd18ee418d97286a961f3c0a6b0051b7e`.
- **Saved reader acquisition:** `docs/components/scroll-shadow.mdx`; 16,789 bytes; SHA-256 `1baea8801a77bbf1497a463cb4500db15b2eba71ef47a47a6ad8da4d5bb08a2e`.
- **Finding:** ScrollShadow documents a CSS scroll-driven auto fade that is correct at first paint without measurement in supporting browsers; other browsers use scroll-state attributes written after hydration. The text warns that the auto mask creates a stacking context and fixed-descendant containing block even without overflow, and root animate-* utilities replace the fade animation. CSS variables expose a 40px fade, 0px offset, and native-scrollbar mask gutter (10px, or 0px with hideScrollBar).
- **Finding lines:** `89-121, 127-136` in the reviewed text.

### 070. [components/search-field](https://heroui.com/en/docs/react/components/search-field)

- **Group / pass:** `components` / `components-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/search-field.mdx` — `pinned-source-mdx`, 12,805 bytes.
- **Full-read lines:** `1-346`; **delivery chunks:** `1-175, 176-346`.
- **Reviewed SHA-256:** `6126d7c2e494c7e8b2ddf69a154ee85d8499796916818458723f12a983fe0540`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/search-field.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/search-field.mdx`; SHA-256 `6126d7c2e494c7e8b2ddf69a154ee85d8499796916818458723f12a983fe0540`.
- **Saved reader acquisition:** `docs/components/search-field.mdx`; 32,099 bytes; SHA-256 `9520c309fffd7e775153bc7d06edbafa78d2155f1e552a7ac1ab636bb7ed0512`.
- **Finding:** SearchField composes a search icon, search-type Input, and optional ClearButton inside Group. It documents hiding the clear button when empty and Description when invalid, separate Enter-key onSubmit and button onClear callbacks, native validation by default, and isFocused deprecation in favor of isFocusWithin. The customization CSS uses broader invalid-attribute presence selectors than the true-valued selectors in the state reference.
- **Finding lines:** `22-39, 132-138, 179-188, 218-247, 294-338` in the reviewed text.
- **Documentation caveat (lines 132-138, 179-183):** The Global CSS example hides Description with [data-invalid] and [aria-invalid] presence selectors, while the Interactive States section describes the invalid condition as [data-invalid="true"] or [aria-invalid="true"]. The example would also match a present aria-invalid="false" (or data-invalid="false") attribute. This is a conditional customization-example/prose mismatch; the shipped stylesheet and actual emitted attributes were not inspected or tested.

### 071. [components/select](https://heroui.com/en/docs/react/components/select)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(pickers)/select.mdx` — `pinned-source-mdx`, 13,711 bytes.
- **Full-read lines:** `1-305`; **delivery chunks:** `1-305`.
- **Reviewed SHA-256:** `3dcc4f2a1875ea999a774e3c9ee3fe34092187bb73c7d3a6857547a2904e0543`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28pickers%29/select.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(pickers)/select.mdx`; SHA-256 `3dcc4f2a1875ea999a774e3c9ee3fe34092187bb73c7d3a6857547a2904e0543`.
- **Saved reader acquisition:** `docs/components/select.mdx`; 51,166 bytes; SHA-256 `e8e62ad37331e49833e05ce55d442dbcd6fcf6fb44817b9da33ac7ff1bfbad19`.
- **Finding:** Select.ClearButton is a pointer-only aria-hidden span to avoid nested buttons; Backspace/Delete provide clearing when the affordance is composed and the popup is closed.
- **Finding lines:** `1-305` in the reviewed text.

### 072. [components/separator](https://heroui.com/en/docs/react/components/separator)

- **Group / pass:** `components` / `components-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(layout)/separator.mdx` — `pinned-source-mdx`, 3,074 bytes.
- **Full-read lines:** `1-120`; **delivery chunks:** `1-120`.
- **Reviewed SHA-256:** `4197582a82bb0caef8a211e8050e22ecea7ba1f2697faf37220f944fd54077b5`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28layout%29/separator.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(layout)/separator.mdx`; SHA-256 `4197582a82bb0caef8a211e8050e22ecea7ba1f2697faf37220f944fd54077b5`.
- **Saved reader acquisition:** `docs/components/separator.mdx`; 9,511 bytes; SHA-256 `ad24e37d001a5e2f647cdb62d3090e955f2226f5161807670fe604e3c4e16eb2`.
- **Finding:** Separator documents isDecorative as an explicit accessibility mode: a purely visual divider defaults to an aria-hidden div with presentational semantics, preserving visual styles and forwarding decorative props/ref to custom render functions. The API defaults to non-decorative horizontal orientation and offers default, secondary, and tertiary contrast variants.
- **Finding lines:** `51-57, 96-116` in the reviewed text.

### 073. [components/sheet](https://heroui.com/en/docs/react/components/sheet)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(overlays)/sheet.mdx` — `pinned-source-mdx`, 14,190 bytes.
- **Full-read lines:** `1-372`; **delivery chunks:** `1-372`.
- **Reviewed SHA-256:** `82900abb9daeb78b5dbb13e25d4a6df7fd26d1463331294e451b99f9061c2d1c`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28overlays%29/sheet.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(overlays)/sheet.mdx`; SHA-256 `82900abb9daeb78b5dbb13e25d4a6df7fd26d1463331294e451b99f9061c2d1c`.
- **Saved reader acquisition:** `docs/components/sheet.mdx`; 47,879 bytes; SHA-256 `66feb09dfdbcb04ce238b3c006099567c7e90b30ea92b500c1b67d424917ae02`.
- **Finding:** Sheet documents pixel-valued numeric snap points and implicit full expansion, with CSS-length alternatives; its handle has no keyboard dragging, so accessible close controls are required.
- **Finding lines:** `1-372` in the reviewed text.

### 074. [components/skeleton](https://heroui.com/en/docs/react/components/skeleton)

- **Group / pass:** `components` / `components-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(feedback)/skeleton.mdx` — `pinned-source-mdx`, 4,405 bytes.
- **Full-read lines:** `1-192`; **delivery chunks:** `1-192`.
- **Reviewed SHA-256:** `94b7821221c22694a507b5f09356c02417308b10801d0a56265dc000850c52ac`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28feedback%29/skeleton.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(feedback)/skeleton.mdx`; SHA-256 `94b7821221c22694a507b5f09356c02417308b10801d0a56265dc000850c52ac`.
- **Saved reader acquisition:** `docs/components/skeleton.mdx`; 9,270 bytes; SHA-256 `21656877c9598c38f2ddeca8c51499fa56e63edad99c807e0c962a73c3df3059`.
- **Finding:** Skeleton documents shimmer, pulse, and static animation modes with a global --skeleton-animation CSS variable, including theme-specific defaults; an explicit animationType prop overrides that global choice. To synchronize one shimmer across multiple placeholders, the page prescribes skeleton--shimmer on the parent and animationType=none on each child, rather than independent child animations.
- **Finding lines:** `47-54, 97-118, 128-138, 181-188` in the reviewed text.

### 075. [components/slider](https://heroui.com/en/docs/react/components/slider)

- **Group / pass:** `components` / `components-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(controls)/slider.mdx` — `pinned-source-mdx`, 13,279 bytes.
- **Full-read lines:** `1-358`; **delivery chunks:** `1-180, 181-358`.
- **Reviewed SHA-256:** `bb6ca46518c785c63a943592ebc293341f915e247d25cd9cf6f1dc5c0df3f167`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28controls%29/slider.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(controls)/slider.mdx`; SHA-256 `bb6ca46518c785c63a943592ebc293341f915e247d25cd9cf6f1dc5c0df3f167`.
- **Saved reader acquisition:** `docs/components/slider.mdx`; 26,219 bytes; SHA-256 `89dba41f9fa9f201eb0a1dd47ff4cbce3a2d09d61cf8714e7417a58ddc207be1`.
- **Finding:** Slider separates step-based value increments from optional dots and independently positioned mark labels. Dots start at minValue without inventing an off-step max endpoint and are omitted for invalid ranges or more than 1,000 dots; non-finite/out-of-bounds marks are omitted and marks do not change snapping. Filled indicators include interval endpoints, follow vertical/locale direction, and retain distinct accessibility: dots are decorative with no tab stops, while marks remain readable text without replacing the accessible label.
- **Finding lines:** `45-79, 219-228, 245-256, 295-326, 340-352` in the reviewed text.

### 076. [components/spinner](https://heroui.com/en/docs/react/components/spinner)

- **Group / pass:** `components` / `components-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(feedback)/spinner.mdx` — `pinned-source-mdx`, 2,349 bytes.
- **Full-read lines:** `1-101`; **delivery chunks:** `1-101`.
- **Reviewed SHA-256:** `2498755473ca94e220523c8e825bceca98e8c58b01f8a6b456ea8b9d57ba35b9`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28feedback%29/spinner.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(feedback)/spinner.mdx`; SHA-256 `2498755473ca94e220523c8e825bceca98e8c58b01f8a6b456ea8b9d57ba35b9`.
- **Saved reader acquisition:** `docs/components/spinner.mdx`; 5,606 bytes; SHA-256 `8f3ac5ad0b9d3a142d0cacde61f2d7ed7b261f080384d3b809b96c63de30edfb`.
- **Finding:** Spinner documents four sizes (sm/md/lg/xl; md default) and five colors (accent default, including current text-color inheritance). Rotation speed is customized with animation utilities, with motion-reduce:animate-none recommended for reduced motion.
- **Finding lines:** `35-42, 75-87, 93-97` in the reviewed text.

### 077. [components/surface](https://heroui.com/en/docs/react/components/surface)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(layout)/surface.mdx` — `pinned-source-mdx`, 2,756 bytes.
- **Full-read lines:** `1-103`; **delivery chunks:** `1-103`.
- **Reviewed SHA-256:** `dd7f98b318c17d2d3b0681ad5ae2ae363f81a9ac3cc96c9ce204874e6aba83c7`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28layout%29/surface.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(layout)/surface.mdx`; SHA-256 `dd7f98b318c17d2d3b0681ad5ae2ae363f81a9ac3cc96c9ce204874e6aba83c7`.
- **Saved reader acquisition:** `docs/components/surface.mdx`; 6,640 bytes; SHA-256 `2e196ff83e096bf75a12d52e6e2285a5fee802d8504531c27401c6a4fb4ffc7f`.
- **Finding:** Surface offers transparent/default/secondary/tertiary variants and a SurfaceContext exposing the current variant; this React appearance context is not automatic CSS-variable transport across portals.
- **Finding lines:** `1-103` in the reviewed text.

### 078. [components/switch](https://heroui.com/en/docs/react/components/switch)

- **Group / pass:** `components` / `components-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(controls)/switch.mdx` — `pinned-source-mdx`, 7,038 bytes.
- **Full-read lines:** `1-270`; **delivery chunks:** `1-200, 201-270`.
- **Reviewed SHA-256:** `56ffbc4aee73392e0c2a502e16093f432b016c860837cf7e22be76828bc53806`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28controls%29/switch.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(controls)/switch.mdx`; SHA-256 `56ffbc4aee73392e0c2a502e16093f432b016c860837cf7e22be76828bc53806`.
- **Saved reader acquisition:** `docs/components/switch.mdx`; 17,991 bytes; SHA-256 `443de7b3744975f423170bdebca8c6b350d02aa7d6ea334979517d60dcc37257`.
- **Finding:** Switch composes Control/Thumb with optional Icon/Content and shared Label/Description. Individual switches document controlled/uncontrolled boolean state, form name/value, required/custom validation, and native-or-aria validationBehavior (native default); SwitchGroup's documented API is orientation (vertical default), children, and className.
- **Finding lines:** `25-64, 189-198, 225-241, 260-266` in the reviewed text.

### 079. [components/table](https://heroui.com/en/docs/react/components/table)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(data-display)/table.mdx` — `pinned-source-mdx`, 13,585 bytes.
- **Full-read lines:** `1-389`; **delivery chunks:** `1-389`.
- **Reviewed SHA-256:** `ead6f02708a5ede51a9069df860c0b45345d2eeb39b54221a4b69ed4af3afda0`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28data-display%29/table.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(data-display)/table.mdx`; SHA-256 `ead6f02708a5ede51a9069df860c0b45345d2eeb39b54221a4b69ed4af3afda0`.
- **Saved reader acquisition:** `docs/components/table.mdx`; 61,547 bytes; SHA-256 `7c6c6350666ef7211dbc9344e9bc1565d6fe4f9bfe8ad84342b6011cda2a07e8`.
- **Finding:** Table.Content uses React Aria's interactive collection model, including selection, sorting, and keyboard navigation; nested editable cells need the documented navigation contract.
- **Finding lines:** `1-389` in the reviewed text.

### 080. [components/tabs](https://heroui.com/en/docs/react/components/tabs)

- **Group / pass:** `components` / `components-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(navigation)/tabs.mdx` — `pinned-source-mdx`, 6,645 bytes.
- **Full-read lines:** `1-236`; **delivery chunks:** `1-200, 201-236`.
- **Reviewed SHA-256:** `d96ac983f330127d64c5237ba2f850f4f20dad808a838404395e60fd2b6cb79b`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28navigation%29/tabs.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(navigation)/tabs.mdx`; SHA-256 `d96ac983f330127d64c5237ba2f850f4f20dad808a838404395e60fd2b6cb79b`.
- **Saved reader acquisition:** `docs/components/tabs.mdx`; 12,489 bytes; SHA-256 `7889c429e2d03cb8f00aeb0257f0f77110a1dc5edd174a58b465423f84268aff`.
- **Finding:** Tabs.ListContainer is documented to automatically add scroll chevrons and fading edges in either orientation. Root align supports start/center/end (center default) with per-tab className overrides, and keyed selection connects tab IDs to matching panel IDs.
- **Finding lines:** `53-60, 92-101, 188-197, 207-228` in the reviewed text.

### 081. [components/tag-group](https://heroui.com/en/docs/react/components/tag-group)

- **Group / pass:** `components` / `components-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(collections)/tag-group.mdx` — `pinned-source-mdx`, 8,298 bytes.
- **Full-read lines:** `1-287`; **delivery chunks:** `1-200, 201-287`.
- **Reviewed SHA-256:** `fb70a005d8ffebcc4cad49989e4a8ce6c0eddb2e0bf5b6f65e1a51d8b18ddc9e`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28collections%29/tag-group.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(collections)/tag-group.mdx`; SHA-256 `fb70a005d8ffebcc4cad49989e4a8ce6c0eddb2e0bf5b6f65e1a51d8b18ddc9e`.
- **Saved reader acquisition:** `docs/components/tag-group.mdx`; 27,623 bytes; SHA-256 `69bef58687126ff51fe7b0ca5eb26b8f464e81c336a97593ca783f9022e8b5c4`.
- **Finding:** TagGroup documents none/single/multiple selection (none default) and onRemove receiving Set<Key>. Providing onRemove automatically renders each tag's remove button unless a custom Tag.RemoveButton is supplied; size and variant belong to TagGroup and explicitly cannot be set on individual Tags.
- **Finding lines:** `181-194, 206-230, 232-270` in the reviewed text.

### 082. [components/text-area](https://heroui.com/en/docs/react/components/text-area)

- **Group / pass:** `components` / `components-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/text-area.mdx` — `pinned-source-mdx`, 4,160 bytes.
- **Full-read lines:** `1-135`; **delivery chunks:** `1-135`.
- **Reviewed SHA-256:** `0ae1f5f600c8c7373d22be167bbad03a875d5723368d55fe933d1e33eff802e9`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/text-area.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/text-area.mdx`; SHA-256 `0ae1f5f600c8c7373d22be167bbad03a875d5723368d55fe933d1e33eff802e9`.
- **Saved reader acquisition:** `docs/components/text-area.mdx`; 10,700 bytes; SHA-256 `1701bfaf6203f83eb4f70aee685fe87e7196283fc8505f8fe9f74e426bfb465b`.
- **Finding:** TextArea is documented as a native-attribute textarea primitive: rows defaults to 3, onChange receives React.ChangeEvent<HTMLTextAreaElement>, and disabled/readOnly/required retain HTML names. The page directs isInvalid/isRequired and error handling to TextField composition; secondary removes the primary shadow for Surface use.
- **Finding lines:** `19-38, 103-127` in the reviewed text.

### 083. [components/text-field](https://heroui.com/en/docs/react/components/text-field)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/text-field.mdx` — `pinned-source-mdx`, 8,348 bytes.
- **Full-read lines:** `1-243`; **delivery chunks:** `1-243`.
- **Reviewed SHA-256:** `8e0073e9346bef430459995defd662714433eefbe7376c47353920942f32a561`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28forms%29/text-field.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(forms)/text-field.mdx`; SHA-256 `8e0073e9346bef430459995defd662714433eefbe7376c47353920942f32a561`.
- **Saved reader acquisition:** `docs/components/text-field.mdx`; 17,958 bytes; SHA-256 `3e3b30aac61ea699c08cf51962404c67fad5d713bfba0e138c2ca9b5944a8d8a`.
- **Finding:** TextField assembles Label, Input, Description, and FieldError with propagated validation state; invalid, read-only, required, and controlled value behavior are field-level concerns.
- **Finding lines:** `1-243` in the reviewed text.

### 084. [components/time-field](https://heroui.com/en/docs/react/components/time-field)

- **Group / pass:** `components` / `components-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(date-and-time)/time-field.mdx` — `pinned-source-mdx`, 15,351 bytes.
- **Full-read lines:** `1-421`; **delivery chunks:** `1-150, 151-300, 301-421`.
- **Reviewed SHA-256:** `17af5651fff7c9cd8fcb70a54753dcb865f6f1da5f462d6d69f853fc1e6b74f7`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28date-and-time%29/time-field.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(date-and-time)/time-field.mdx`; SHA-256 `17af5651fff7c9cd8fcb70a54753dcb865f6f1da5f462d6d69f853fc1e6b74f7`.
- **Saved reader acquisition:** `docs/components/time-field.mdx`; 33,084 bytes; SHA-256 `ab82b787cdba7f2fe3299ac2b77208afb7d4feee97684050e28119365e99726e`.
- **Finding:** TimeField documents segmented editing with @internationalized/date TimeValue|null (Time, CalendarDateTime, ZonedDateTime), min/max/custom validation with native behavior by default, and ISO 8601 form submission via name. Invalid state is documented to hide Description; Group/Input/Segment styling uses the .date-input-group namespace while the root is .time-field.
- **Finding lines:** `21-36, 143-154, 173-200, 209-214, 262-288, 402-417` in the reviewed text.

### 085. [components/toast](https://heroui.com/en/docs/react/components/toast)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(overlays)/toast.mdx` — `pinned-source-mdx`, 12,662 bytes.
- **Full-read lines:** `1-365`; **delivery chunks:** `1-365`.
- **Reviewed SHA-256:** `f8a6548e50b5ab7e626225c4e4a322a3fa1baec532704570612b8a062152f596`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28overlays%29/toast.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(overlays)/toast.mdx`; SHA-256 `f8a6548e50b5ab7e626225c4e4a322a3fa1baec532704570612b8a062152f596`.
- **Saved reader acquisition:** `docs/components/toast.mdx`; 44,716 bytes; SHA-256 `71d9edb8e9b51dd2b9d74ee69f14f69bb1cdb98903b09e45bf2d95a20ef9f523`.
- **Finding:** Toast combines a provider/queue with stacked notifications, updates, actions, timer pausing, and keyboard access; its documented lifecycle is substantially more than a visual alert.
- **Finding lines:** `1-365` in the reviewed text.

### 086. [components/toggle-button](https://heroui.com/en/docs/react/components/toggle-button)

- **Group / pass:** `components` / `components-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(buttons)/toggle-button.mdx` — `pinned-source-mdx`, 4,244 bytes.
- **Full-read lines:** `1-143`; **delivery chunks:** `1-143`.
- **Reviewed SHA-256:** `9b56ed14d0355fab6b2c6d6955c4166d2fef9c7501c96c583eacf941be25462e`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28buttons%29/toggle-button.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(buttons)/toggle-button.mdx`; SHA-256 `9b56ed14d0355fab6b2c6d6955c4166d2fef9c7501c96c583eacf941be25462e`.
- **Saved reader acquisition:** `docs/components/toggle-button.mdx`; 8,709 bytes; SHA-256 `c857002eab6978bba4fe31244cad1a2190795ee2ef9b38fb8a19153b638a4932`.
- **Finding:** ToggleButton documents a boolean selection callback onChange separately from the PressEvent onPress action, controlled/uncontrolled selected state, default/ghost variants, and state render props. Its selected styling uses accent colors, while pressed styling includes a scale transform.
- **Finding lines:** `91-108, 114-139` in the reviewed text.

### 087. [components/toggle-button-group](https://heroui.com/en/docs/react/components/toggle-button-group)

- **Group / pass:** `components` / `components-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(buttons)/toggle-button-group.mdx` — `pinned-source-mdx`, 5,205 bytes.
- **Full-read lines:** `1-180`; **delivery chunks:** `1-180`.
- **Reviewed SHA-256:** `c13846ae623085daf14914e316e9c7d9e340ec5631008b5dbe84e4b863b03fbf`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28buttons%29/toggle-button-group.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(buttons)/toggle-button-group.mdx`; SHA-256 `c13846ae623085daf14914e316e9c7d9e340ec5631008b5dbe84e4b863b03fbf`.
- **Saved reader acquisition:** `docs/components/toggle-button-group.mdx`; 20,447 bytes; SHA-256 `8ce842b2d79ca8faebb5225effde78705d0420dc2fdf3bc451048e7446a66099`.
- **Finding:** ToggleButtonGroup documents keyed single/multiple selection (single default), Iterable<Key> inputs and Set<Key> change output, matching unique child IDs, and propagated size. Its disabled-all API wording is qualified by the explicit note that an individual ToggleButton can set isDisabled={false}; disallowEmptySelection defaults to false.
- **Finding lines:** `149-161, 169-176` in the reviewed text.

### 088. [components/toolbar](https://heroui.com/en/docs/react/components/toolbar)

- **Group / pass:** `components` / `components-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(layout)/toolbar.mdx` — `pinned-source-mdx`, 2,545 bytes.
- **Full-read lines:** `1-99`; **delivery chunks:** `1-99`.
- **Reviewed SHA-256:** `569f898b7598b26597982901bfd149c8cf14b9580af3e36c93215ff1e6d0086d`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28layout%29/toolbar.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(layout)/toolbar.mdx`; SHA-256 `569f898b7598b26597982901bfd149c8cf14b9580af3e36c93215ff1e6d0086d`.
- **Saved reader acquisition:** `docs/components/toolbar.mdx`; 9,559 bytes; SHA-256 `128d5bb11f95cb120106a84e21c4a7beac9d6480cb830096fab949b8c1ba43eb`.
- **Finding:** Toolbar is documented as an arrow-key-navigation container, with horizontal default orientation, accessible naming through aria-label/aria-labelledby, and orientation available to children/className render props. isAttached (false by default) adds a surface background and full rounding.
- **Finding lines:** `1-9, 69-95` in the reviewed text.

### 089. [components/tooltip](https://heroui.com/en/docs/react/components/tooltip)

- **Group / pass:** `components` / `components-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(overlays)/tooltip.mdx` — `pinned-source-mdx`, 4,768 bytes.
- **Full-read lines:** `1-172`; **delivery chunks:** `1-172`.
- **Reviewed SHA-256:** `1fc6112b1dfeb0f16953ba1b7ac04b1a7cad690ead4a74282718aa58dd4e7d4c`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28overlays%29/tooltip.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(overlays)/tooltip.mdx`; SHA-256 `1fc6112b1dfeb0f16953ba1b7ac04b1a7cad690ead4a74282718aa58dd4e7d4c`.
- **Saved reader acquisition:** `docs/components/tooltip.mdx`; 12,884 bytes; SHA-256 `640262aed4d4d477d28542083efb70c8bad4feda449d3ab3786c49a0a32747b6`.
- **Finding:** Tooltip documents global --tooltip-delay/--tooltip-close-delay defaults of 1500ms/500ms, CSS ms/s units, and per-instance numeric delay/closeDelay overrides. Content defaults to top placement and offset 3 (7 with an arrow); shouldSkipAnimation controls enter/exit animation when moving quickly between tooltips.
- **Finding lines:** `94-114, 135-153` in the reviewed text.

### 090. [components/typography](https://heroui.com/en/docs/react/components/typography)

- **Group / pass:** `components` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(typography)/typography.mdx` — `pinned-source-mdx`, 4,360 bytes.
- **Full-read lines:** `1-119`; **delivery chunks:** `1-119`.
- **Reviewed SHA-256:** `9bba11ed56afe59b85bda30dcf7f31ddfb3cbe4ec3f51e1b279dd5de6cc79fdc`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/%28typography%29/typography.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/components/(typography)/typography.mdx`; SHA-256 `9bba11ed56afe59b85bda30dcf7f31ddfb3cbe4ec3f51e1b279dd5de6cc79fdc`.
- **Saved reader acquisition:** `docs/components/typography.mdx`; 9,477 bytes; SHA-256 `a64361d42179e3e2d6aecaa525ee747d08e842c3430f1e90de3fc2aab2c82fe5`.
- **Finding:** Typography maps visual type values to semantic elements, adds Heading/Paragraph/Code/Prose helpers, and permits custom DOM rendering; visual hierarchy and document semantics must stay aligned.
- **Finding lines:** `1-119` in the reviewed text.

## migration

### 091. [migration](https://heroui.com/en/docs/react/migration)

- **Group / pass:** `migration` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/index.mdx` — `pinned-source-mdx`, 12,701 bytes.
- **Full-read lines:** `1-198`; **delivery chunks:** `1-198`.
- **Reviewed SHA-256:** `38a168f54079050e538674c2066c6df0291a7f9cfe3a158f3608f3b4c806cba1`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/index.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/index.mdx`; SHA-256 `38a168f54079050e538674c2066c6df0291a7f9cfe3a158f3608f3b4c806cba1`.
- **Saved reader acquisition:** `docs/migration.mdx`; 18,420 bytes; SHA-256 `0f99edba53034322e113bf4b0a90c7b9b40fedc180d91f52d4ae1d3f8e6e647e`.
- **Finding:** v2-to-v3 collection migration separates React key from behavioral id and non-plain-content textValue; it also removes component hooks/provider assumptions and distinguishes full from coexistence migration.
- **Finding lines:** `1-198` in the reviewed text.

### 092. [migration/accordion](https://heroui.com/en/docs/react/migration/accordion)

- **Group / pass:** `migration` / `migration-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/accordion.mdx` — `pinned-source-mdx`, 10,662 bytes.
- **Full-read lines:** `1-382`; **delivery chunks:** `1-200, 201-382`.
- **Reviewed SHA-256:** `cba58f4cb9cf33006b6b529f696441b326a23ae30108454cac417fdc07e54ae0`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/accordion.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/accordion.mdx`; SHA-256 `cba58f4cb9cf33006b6b529f696441b326a23ae30108454cac417fdc07e54ae0`.
- **Saved reader acquisition:** `docs/migration/accordion.mdx`; 11,961 bytes; SHA-256 `d11b0fea495823a1153d103ec9f7b3a615013e7d9a2a717b6e4a6099ec7c7c2e`.
- **Finding:** The guide replaces v2's prop-driven AccordionItem with explicit Item/Heading/Trigger/Indicator/Panel/Body composition. selectedKeys/defaultSelectedKeys/onSelectionChange become expandedKeys/defaultExpandedKeys/onExpandedChange; selectionMode=multiple becomes allowsMultipleExpanded. Item id owns expansion identity while React key remains for reconciliation. Four variants become default/surface, and keepContentMounted is removed with content documented as always mounted. The disabled-items example moves root disabledKeys to Item isDisabled.
- **Finding lines:** `74-112, 277-323` in the reviewed text.
- **Documentation caveat (lines 81-85, 277-285):** The prop table says v2 defaultSelectedKeys is renamed to v3 defaultExpandedKeys, but the example explicitly labeled v2 already uses defaultExpandedKeys. This is an internal version-label/example inconsistency, not evidence that the current v3 prop is defective.

### 093. [migration/agent-guide-full](https://heroui.com/en/docs/react/migration/agent-guide-full)

- **Group / pass:** `migration` / `migration-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(workflows)/agent-guide-full.mdx` — `pinned-source-mdx`, 12,839 bytes.
- **Full-read lines:** `1-322`; **delivery chunks:** `1-200, 201-322`.
- **Reviewed SHA-256:** `cc11fe7c1390002d4033ed1f683ed311d6ce42def93dce6829e25606b11ae53f`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28workflows%29/agent-guide-full.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(workflows)/agent-guide-full.mdx`; SHA-256 `cc11fe7c1390002d4033ed1f683ed311d6ce42def93dce6829e25606b11ae53f`.
- **Saved reader acquisition:** `docs/migration/agent-guide-full.mdx`; 25,748 bytes; SHA-256 `82be09d1d1a73358918525a5dbf47e6d7be0cde9b9f1f0525198198375de1268`.
- **Finding:** Full migration is documented as batched v3 code preparation under v2 dependencies, with a broken intermediate project and an all-or-nothing HeroUI dependency switch. It replaces most component hooks with compound components and useDisclosure with useOverlayState. React 19/Tailwind v4 preparation precedes the switch; the final switch replaces v2 react/theme packages with v3 react/styles, adds the styles import, and removes HeroUIProvider and the heroui() Tailwind plugin. Styling follows the switch. Its no-coexistence policy is explicitly scoped to full migration near the end.
- **Finding lines:** `9-24, 42-58, 88-102, 121-138, 165-200, 301-306` in the reviewed text.
- **Documentation caveat (lines 165-167, 250-253, 270-274):** The final phase and best practices require ALL component migrations to be complete before switching dependencies, yet the error-handling advice says to return to failed component migrations after that switch. The text does not reconcile this exception with its all-components prerequisite.
- **Documentation caveat (lines 97-102, 183-200):** Verification timing is inconsistent: the guide prohibits starting/running the project during migration and defers full visual/functionality/accessibility testing until completion, but the migration phase itself asks to verify components work and test visual appearance. This is a workflow-instruction inconsistency; no runtime verification was performed.

### 094. [migration/agent-guide-incremental](https://heroui.com/en/docs/react/migration/agent-guide-incremental)

- **Group / pass:** `migration` / `migration-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(workflows)/agent-guide-incremental.mdx` — `pinned-source-mdx`, 10,410 bytes.
- **Full-read lines:** `1-258`; **delivery chunks:** `1-200, 201-258`.
- **Reviewed SHA-256:** `6647e5612a8de10ff9fdb78f1d33ab424500eed788f1a224ffaeee509bd4bbde`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28workflows%29/agent-guide-incremental.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(workflows)/agent-guide-incremental.mdx`; SHA-256 `6647e5612a8de10ff9fdb78f1d33ab424500eed788f1a224ffaeee509bd4bbde`.
- **Saved reader acquisition:** `docs/migration/agent-guide-incremental.mdx`; 23,337 bytes; SHA-256 `cfc0137fe60c4f9f2148e063b96861e0dd9f7d8698ad7465939fe1d5c7d59097`.
- **Finding:** Incremental migration documents temporary v2/v3 coexistence: Strategy A keeps v2 @heroui/react and imports v3 through @heroui-v3/react; Strategy B keeps v2 component packages alongside v3 @heroui/react. It prescribes per-component API/hook conversion and testing, both CSS systems with the v2 plugin during coexistence, and tailwindcss before @heroui/styles. Code, Image, Navbar, Ripple, Snippet, Spacer, and User may remain on v2 unless replacement is requested, which creates a dependency-cleanup conflict in the completion instructions.
- **Finding lines:** `9-22, 39-100, 106-130, 142-158, 239-242` in the reviewed text.
- **Documentation caveat (lines 22-22, 47-50, 106-111, 142-158, 239-242):** The guide says to retain v2-only components unless explicitly asked to remove them. Its completion section then removes v2 dependencies/component packages and v2 CSS/plugin while expressly allowing those removed-in-v3 components to remain for later removal. Although the section begins 'Once all components are migrated', its retained-component caveat leaves that cleanup incompatible with its own coexistence setup requirements.

### 095. [migration/agent-index](https://heroui.com/en/docs/react/migration/agent-index)

- **Group / pass:** `migration` / `migration-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/agent-index.mdx` — `pinned-source-mdx`, 887 bytes.
- **Full-read lines:** `1-20`; **delivery chunks:** `1-20`.
- **Reviewed SHA-256:** `da53783b9e36c6a7332728136ac1399070eb51dd10741373a46abd50d09e7135`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/agent-index.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/agent-index.mdx`; SHA-256 `da53783b9e36c6a7332728136ac1399070eb51dd10741373a46abd50d09e7135`.
- **Saved reader acquisition:** `docs/migration/agent-index.mdx`; 1,131 bytes; SHA-256 `c31e16860b5169c61d1f2c00d2cd160d062f809ae92ec9334746123f82fab4bb`.
- **Finding:** This v2-to-v3 entry point makes strategy selection explicit: full migration accepts a broken project, whereas incremental migration permits coexistence. It directs agents to separate workflow files, hooks/styling guides, and per-component guides rather than defining an additional API migration. It says the workflow bundle inlines major/API changes, component references, and new components; the assigned source workflow files instead expose literal include directives, so reading them does not establish coverage of the expanded bundle.
- **Finding lines:** `7-20` in the reviewed text.

### 096. [migration/agent-skills](https://heroui.com/en/docs/react/migration/agent-skills)

- **Group / pass:** `migration` / `migration-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(migration-for-agents)/agent-skills.mdx` — `pinned-source-mdx`, 2,441 bytes.
- **Full-read lines:** `1-70`; **delivery chunks:** `1-70`.
- **Reviewed SHA-256:** `5e3d9fc6da75598626d92448b928a07b217acbeac039303301d3b010109a6ab5`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28migration-for-agents%29/agent-skills.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(migration-for-agents)/agent-skills.mdx`; SHA-256 `5e3d9fc6da75598626d92448b928a07b217acbeac039303301d3b010109a6ab5`.
- **Saved reader acquisition:** `docs/migration/agent-skills.mdx`; 2,732 bytes; SHA-256 `231c00d876574b1fa8d2c81af4351d45590d9c4bc05f5f9fc988cabcf707e00e`.
- **Finding:** The migration skill packages full/incremental workflows, a documented 39 component guides, compound API changes, styling-token changes, and the concrete useDisclosure-to-useOverlayState delta. The install script is documented as home-scoped by default; HEROUI_SKILL_SCOPE=project selects tool-specific project directories, including .opencode/skills/. Assistants can discover it automatically or invoke /heroui-migration. These are installation/packaging claims in the source, not executed or independently verified behavior.
- **Finding lines:** `6-18, 24-50, 54-64` in the reviewed text.

### 097. [migration/agents-md](https://heroui.com/en/docs/react/migration/agents-md)

- **Group / pass:** `migration` / `migration-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(migration-for-agents)/agents-md.mdx` — `pinned-source-mdx`, 1,732 bytes.
- **Full-read lines:** `1-51`; **delivery chunks:** `1-51`.
- **Reviewed SHA-256:** `40b83d9b690b68c0cf04c0308d339bbf1134ce3c8e5b59895344af70e1f2b250`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28migration-for-agents%29/agents-md.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(migration-for-agents)/agents-md.mdx`; SHA-256 `40b83d9b690b68c0cf04c0308d339bbf1134ce3c8e5b59895344af70e1f2b250`.
- **Saved reader acquisition:** `docs/migration/agents-md.mdx`; 2,008 bytes; SHA-256 `e0cdf698362329c468a25c341862076ca889ce1659b557f07685ab3ba07ceaf4`.
- **Finding:** For v2-to-v3 projects, the CLI's agents-md --migration mode downloads migration-specific workflows/component/hooks/styling guidance rather than --react component documentation, with only one library option allowed at a time. It is documented to write .heroui-docs/migration/, generate AGENTS.md or CLAUDE.md indexes, and add .heroui-docs/ to .gitignore; --output accepts multiple files. The stated v3 target baseline is Tailwind CSS >=4 and React >=19.0.0, with @heroui/react or @heroui/styles after migration. This tooling page supplies no separate component-prop delta.
- **Finding lines:** `6-9, 12-43` in the reviewed text.

### 098. [migration/alert](https://heroui.com/en/docs/react/migration/alert)

- **Group / pass:** `migration` / `migration-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/alert.mdx` — `pinned-source-mdx`, 6,925 bytes.
- **Full-read lines:** `1-263`; **delivery chunks:** `1-200, 201-263`.
- **Reviewed SHA-256:** `08ae7b6c4d5ffe9fb6d5a65d7fd1c96e00b9d98d7ba33ae9c20c6039e3065979`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/alert.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/alert.mdx`; SHA-256 `08ae7b6c4d5ffe9fb6d5a65d7fd1c96e00b9d98d7ba33ae9c20c6039e3065979`.
- **Saved reader acquisition:** `docs/migration/alert.mdx`; 8,141 bytes; SHA-256 `1249ca04822b63cef4688e1a1dbb353e722a8095114f2328a662107a8f7042a2`.
- **Finding:** Alert moves from v2 title/description/icon props to explicit Indicator/Content/Title/Description composition. color becomes status, primary becomes accent, and secondary maps to default; variant and radius are removed in favor of styling classes. Visibility and close APIs are also removed: the v3 example owns isVisible state, conditionally renders Alert, and adds an aria-labeled CloseButton with onPress. This is a state-ownership change, not merely an import/prop rename.
- **Finding lines:** `49-95, 178-208, 254-263` in the reviewed text.
- **Documentation caveat (lines 78-83, 140-173):** The endContent migration table prescribes placement after Alert.Content, while the v3 'With Action Button (End Content)' example nests its Button inside Alert.Content. These disagree on the suggested placement recipe; this does not establish that either composition is unsupported at runtime.

### 099. [migration/autocomplete](https://heroui.com/en/docs/react/migration/autocomplete)

- **Group / pass:** `migration` / `migration-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/autocomplete.mdx` — `pinned-source-mdx`, 20,290 bytes.
- **Full-read lines:** `1-584`; **delivery chunks:** `1-200, 201-400, 401-584`.
- **Reviewed SHA-256:** `c0b939d6b2a3a89132c46eddacb4e4d25efe7cf84a89405d4b63fbb73ddd82a0`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/autocomplete.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/autocomplete.mdx`; SHA-256 `c0b939d6b2a3a89132c46eddacb4e4d25efe7cf84a89405d4b63fbb73ddd82a0`.
- **Saved reader acquisition:** `docs/migration/autocomplete.mdx`; 26,027 bytes; SHA-256 `990e6ed50734aed4c1f3bdcdec9f3d7aad03f2d2d4ef640c589a12436abb425f`.
- **Finding:** The guide documents two replacements: v3 ComboBox is closest to v2 Autocomplete's visible inline input, while v3 Autocomplete is a button-triggered searchable select with filtering inside its popover. ComboBox retains selectedKey/onSelectionChange and inputValue/onInputChange; Autocomplete uses value/onChange and moves search state to Autocomplete.Filter. Items/sections become ListBox parts with id/textValue. Autocomplete provides ClearButton and locale-aware useFilter composition; ComboBox clearing is manual and filtering uses defaultFilter. Validation examples replace errorMessage with an explicit FieldError.
- **Finding lines:** `10-21, 40-42, 128-184, 186-234, 458-518, 573-584` in the reviewed text.
- **Documentation caveat (lines 186-199, 215-228, 582-582):** The Autocomplete prop table puts variant in a group labeled 'Removed (use Tailwind CSS)' while the same row says variant supports primary/secondary. The summary also says variant now supports primary/secondary. This is internally contradictory removal wording; it does not prove those v3 variants are broken. The separate ComboBox table independently labels its variant removed.

### 100. [migration/avatar](https://heroui.com/en/docs/react/migration/avatar)

- **Group / pass:** `migration` / `migration-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/avatar.mdx` — `pinned-source-mdx`, 12,313 bytes.
- **Full-read lines:** `1-416`; **delivery chunks:** `1-200, 201-400, 401-416`.
- **Reviewed SHA-256:** `22f3358f4274930d32bb85bae9ca0b5769e7904d8fb34831dc25a24d0980cea8`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/avatar.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/avatar.mdx`; SHA-256 `22f3358f4274930d32bb85bae9ca0b5769e7904d8fb34831dc25a24d0980cea8`.
- **Saved reader acquisition:** `docs/migration/avatar.mdx`; 16,813 bytes; SHA-256 `1bdd27a5400b7e17bedb7036cc4f39cf825bc6b82eee86d97a678058e3019468`.
- **Finding:** Avatar moves v2 src/onError into Avatar.Image and fallback/icon content into Avatar.Fallback; callers now generate initials instead of passing name/getInitials. The guide documents new default/soft variants, responsive image attributes, and Fallback delayMs. At this pin AvatarGroup is explicitly available again with inherited size/color/variant, max, isGrid, and clip/ring overlap. v2 total becomes an explicit AvatarGroup.Count that suppresses automatic max overflow counting; its total=12/max=3 example becomes Count +9.
- **Finding lines:** `45-70, 72-112, 130-155, 291-326, 382-399, 404-416` in the reviewed text.

### 101. [migration/badge](https://heroui.com/en/docs/react/migration/badge)

- **Group / pass:** `migration` / `migration-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/badge.mdx` — `pinned-source-mdx`, 7,216 bytes.
- **Full-read lines:** `1-275`; **delivery chunks:** `1-200, 201-275`.
- **Reviewed SHA-256:** `8bac7fdfeb69824749fb5826bb8ba17787007cc6374083f58928ba16e267c11a`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/badge.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/badge.mdx`; SHA-256 `8bac7fdfeb69824749fb5826bb8ba17787007cc6374083f58928ba16e267c11a`.
- **Saved reader acquisition:** `docs/migration/badge.mdx`; 8,593 bytes; SHA-256 `341827da28d921042ff47a01f7c8f474d7b9f8aaad9e4ee9b19924b944567366`.
- **Finding:** Badge changes from a v2 wrapper with a content prop to Badge.Anchor containing the anchored element and Badge as siblings; the badge content is now Badge children. Badge.Label is documented as auto-wrapping string/number children. isDot becomes omitted children and isInvisible becomes conditional rendering of Badge. Variant mappings are solid-to-primary, flat-to-soft, faded-to-secondary, and shadow-to-primary plus CSS shadow; primary color becomes accent, while removed secondary color maps to default or accent by context. Size and placement remain on Badge.
- **Finding lines:** `12-49, 61-98, 129-150, 175-200, 244-275` in the reviewed text.
- **Documentation caveat (lines 33-39, 118-124, 255-268):** Summary item 1 literally calls 'Badge.Anchor + Badge' siblings, but the v3 examples and anatomy nest Badge inside Badge.Anchor. The actual sibling pair in those examples is the anchored element and Badge. This is a summary-topology wording conflict, not a tested component defect.

### 102. [migration/breadcrumbs](https://heroui.com/en/docs/react/migration/breadcrumbs)

- **Group / pass:** `migration` / `migration-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/breadcrumbs.mdx` — `pinned-source-mdx`, 4,544 bytes.
- **Full-read lines:** `1-142`; **delivery chunks:** `1-142`.
- **Reviewed SHA-256:** `f9db48cef299526c5b361992090f14c7448da15b4f9d2bba4def34f333a096c2`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/breadcrumbs.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/breadcrumbs.mdx`; SHA-256 `f9db48cef299526c5b361992090f14c7448da15b4f9d2bba4def34f333a096c2`.
- **Saved reader acquisition:** `docs/migration/breadcrumbs.mdx`; 5,458 bytes; SHA-256 `b9b53854d4a4f171d9cf477673009ca24e03afa1733a08b210e443525e6fd425`.
- **Finding:** The guide documents v2 BreadcrumbItem becoming v3 BreadcrumbsItem, children replacing the items prop, and removal of maxItems/collapse/ellipsis and slot-class props. Root isDisabled now disables all breadcrumb links; href selects the built-in Link, and the final item without href is documented to receive aria-current=page automatically.
- **Finding lines:** `46-79, 134-142` in the reviewed text.

### 103. [migration/button](https://heroui.com/en/docs/react/migration/button)

- **Group / pass:** `migration` / `migration-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/button.mdx` — `pinned-source-mdx`, 10,495 bytes.
- **Full-read lines:** `1-356`; **delivery chunks:** `1-200, 201-356`.
- **Reviewed SHA-256:** `60a4b7d8eb92762801c191ac6746c34723ae3cb35a09090c745988395e062c31`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/button.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/button.mdx`; SHA-256 `60a4b7d8eb92762801c191ac6746c34723ae3cb35a09090c745988395e062c31`.
- **Saved reader acquisition:** `docs/migration/button.mdx`; 11,838 bytes; SHA-256 `cedcede1c8f8fef7dd64cf4c427007e5c124b0acfa95297f59665d1ab5f11898`.
- **Finding:** The documented v2 color+variant matrix becomes a single v3 variant, including danger-soft for flat danger buttons. isLoading becomes isPending, with spinner and icon placement explicitly composed in children/render props; isIconOnly remains supported. Default width changes from size-based minimum widths to w-fit, requiring min-w-* classes when preserving the old footprint.
- **Finding lines:** `34-81, 176-209, 300-340, 344-356` in the reviewed text.

### 104. [migration/button-group](https://heroui.com/en/docs/react/migration/button-group)

- **Group / pass:** `migration` / `migration-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/button-group.mdx` — `pinned-source-mdx`, 2,044 bytes.
- **Full-read lines:** `1-65`; **delivery chunks:** `1-65`.
- **Reviewed SHA-256:** `9d13676874787def5dc4594df7b314e41003ef99312ad04595f42e54c9c26542`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/button-group.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/button-group.mdx`; SHA-256 `9d13676874787def5dc4594df7b314e41003ef99312ad04595f42e54c9c26542`.
- **Saved reader acquisition:** `docs/migration/button-group.mdx`; 2,318 bytes; SHA-256 `aa33ca85172f641e1a447f1ed01e76997d534da8d1e617e35274bfd134190dd3`.
- **Finding:** ButtonGroup keeps its v2 nesting and package import, but its documented inherited props narrow from size/color/variant/radius/isIconOnly/isDisabled/disableAnimation/disableRipple/fullWidth to size/variant/isDisabled/fullWidth in v3. A new hideSeparator prop controls the visual separators; the page's phrase enhanced prop inheritance does not mean all v2 inherited props survive.
- **Finding lines:** `28-42, 46-65` in the reviewed text.

### 105. [migration/calendar](https://heroui.com/en/docs/react/migration/calendar)

- **Group / pass:** `migration` / `migration-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/calendar.mdx` — `pinned-source-mdx`, 13,267 bytes.
- **Full-read lines:** `1-455`; **delivery chunks:** `1-200, 201-400, 401-455`.
- **Reviewed SHA-256:** `ce4dffade5368fa8c8ceb1174d0ce45204d5369f562e2c0c7d7d93552fc5e07d`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/calendar.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/calendar.mdx`; SHA-256 `ce4dffade5368fa8c8ceb1174d0ce45204d5369f562e2c0c7d7d93552fc5e07d`.
- **Saved reader acquisition:** `docs/migration/calendar.mdx`; 15,452 bytes; SHA-256 `5969a08ece8c2531aeb31f2cef38a37919ba9ed8f9e9c998c989ec2169c7d06a`.
- **Finding:** The guide replaces v2's internally laid-out Calendar with explicit v3 header/navigation/grid parts. visibleMonths={n} becomes visibleDuration={{months: n}} plus separate Grid instances with month offsets; showMonthAndYearPickers becomes composed year-picker parts, and onHeaderExpandedChange becomes onYearPickerOpenChange. Value/focus/date-constraint props retain their names, but firstDayOfWeek is replaced by locale configuration and errorMessage by external validation handling; CellIndicator/render-prop cell customization is new.
- **Finding lines:** `50-93, 198-265, 355-384, 448-455` in the reviewed text.

### 106. [migration/card](https://heroui.com/en/docs/react/migration/card)

- **Group / pass:** `migration` / `migration-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/card.mdx` — `pinned-source-mdx`, 8,712 bytes.
- **Full-read lines:** `1-320`; **delivery chunks:** `1-200, 201-320`.
- **Reviewed SHA-256:** `c5fac70995bbf3d2818562f889a4f82fa8c69d66c6aaf2d83988671dcacf0ed2`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/card.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/card.mdx`; SHA-256 `c5fac70995bbf3d2818562f889a4f82fa8c69d66c6aaf2d83988671dcacf0ed2`.
- **Saved reader acquisition:** `docs/migration/card.mdx`; 9,788 bytes; SHA-256 `8a6067eb12fcad63b3801a58f647da1dba677a086cc97e2139a74cab75dcbf2d`.
- **Finding:** v2 CardHeader/CardBody/CardFooter become v3 Card.Header/Card.Content/Card.Footer, with new Card.Title and Card.Description. The guide moves isPressable behavior to a button or link inside Card, removes root isDisabled and styling props such as shadow/radius/fullWidth/blur, and adds transparent/default/secondary/tertiary prominence variants; direct className on parts replaces classNames.
- **Finding lines:** `49-82, 132-159, 282-295, 313-320` in the reviewed text.

### 107. [migration/checkbox](https://heroui.com/en/docs/react/migration/checkbox)

- **Group / pass:** `migration` / `migration-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/checkbox.mdx` — `pinned-source-mdx`, 10,892 bytes.
- **Full-read lines:** `1-404`; **delivery chunks:** `1-200, 201-400, 401-404`.
- **Reviewed SHA-256:** `264362d28beb7847fe746d116e5dadb2d7659043eeb90551d4f50acfe7a60a43`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/checkbox.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/checkbox.mdx`; SHA-256 `264362d28beb7847fe746d116e5dadb2d7659043eeb90551d4f50acfe7a60a43`.
- **Saved reader acquisition:** `docs/migration/checkbox.mdx`; 11,808 bytes; SHA-256 `6fd390069a4be53e4b808e59ddbab39ba7f395e40451656e43e7bf5459e3db29`.
- **Finding:** The documented v2 label-as-children Checkbox becomes v3 Checkbox.Content containing Control/Indicator and label text, with Description/FieldError beside Content. onValueChange becomes onChange; color/size/radius move to CSS on Control, custom icon content moves to Indicator, and primary/secondary variants plus Indicator state render props are added. The summary's Button part name conflicts with the page's Content structure.
- **Finding lines:** `43-70, 97-104, 125-133, 251-275, 299-345, 379-404` in the reviewed text.
- **Documentation caveat (lines 43-51, 379-394):** The v3 summary at L393 lists compound parts as Button, Control, Indicator, while L46 explicitly lists Checkbox.Content, Checkbox.Control, Checkbox.Indicator and the anatomy at L381-L388 uses Content. This is an internal naming inconsistency in the pinned guide, not a tested claim that the current library exposes or lacks a Button part.

### 108. [migration/checkbox-group](https://heroui.com/en/docs/react/migration/checkbox-group)

- **Group / pass:** `migration` / `migration-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/checkbox-group.mdx` — `pinned-source-mdx`, 4,493 bytes.
- **Full-read lines:** `1-163`; **delivery chunks:** `1-163`.
- **Reviewed SHA-256:** `d523b0ef9eab2752ca287e268f9391ca40232b9348b5d8bb6b3fbed56adbfc0a`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/checkbox-group.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/checkbox-group.mdx`; SHA-256 `d523b0ef9eab2752ca287e268f9391ca40232b9348b5d8bb6b3fbed56adbfc0a`.
- **Saved reader acquisition:** `docs/migration/checkbox-group.mdx`; 4,771 bytes; SHA-256 `d6a189b252a2de2718d94f53f6f890a23624145fd48bd27ac2f390c244a06982`.
- **Finding:** CheckboxGroup remains a separate component in v3, but its v2 label prop becomes a child Label, Description is composed as a child, and every checkbox uses Content/Control/Indicator. Controlled value remains an array in both examples while onValueChange becomes onChange; the guide adds name for form integration and documents a new group-container variant prop.
- **Finding lines:** `28-64, 68-90, 94-152, 157-163` in the reviewed text.

### 109. [migration/chip](https://heroui.com/en/docs/react/migration/chip)

- **Group / pass:** `migration` / `migration-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/chip.mdx` — `pinned-source-mdx`, 8,196 bytes.
- **Full-read lines:** `1-309`; **delivery chunks:** `1-200, 201-309`.
- **Reviewed SHA-256:** `ef366d5ec9291df50c9ef6ded73e21d902dec4d419b4d3121d7fd473a21ba583`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/chip.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/chip.mdx`; SHA-256 `ef366d5ec9291df50c9ef6ded73e21d902dec4d419b4d3121d7fd473a21ba583`.
- **Saved reader acquisition:** `docs/migration/chip.mdx`; 9,211 bytes; SHA-256 `9ce019c5b1d5c0fbd7a88c832609515b6f56055c0d35c5595e8afc340ad05924`.
- **Finding:** Chip reduces v2's seven variants to primary/secondary/tertiary/soft, retains a separate color prop with primary renamed accent and secondary removed, and keeps sm/md/lg sizes (md default). New Chip.Label is optional because plain-text children are documented to auto-wrap. Avatar/icons/closing become explicit children, including CloseButton with onPress; dot and shadow styling require manual composition/CSS, and radius/isDisabled/classNames are removed.
- **Finding lines:** `12-93, 201-238, 240-268, 295-309` in the reviewed text.

### 110. [migration/circular-progress](https://heroui.com/en/docs/react/migration/circular-progress)

- **Group / pass:** `migration` / `migration-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/circular-progress.mdx` — `pinned-source-mdx`, 6,261 bytes.
- **Full-read lines:** `1-228`; **delivery chunks:** `1-200, 201-228`.
- **Reviewed SHA-256:** `15e5530a51125afb5cd03ea54266ee72617827988191ad63490562acf4f0213f`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/circular-progress.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/circular-progress.mdx`; SHA-256 `15e5530a51125afb5cd03ea54266ee72617827988191ad63490562acf4f0213f`.
- **Saved reader acquisition:** `docs/migration/circular-progress.mdx`; 7,903 bytes; SHA-256 `144b66eef2f13fbe5ed31dbdd8695a7391090f1115f66d1c65d2ee400bb9fdda`.
- **Finding:** v2 CircularProgress becomes v3 ProgressCircle with explicit Track, TrackCircle and FillCircle parts. The documented isIndeterminate default changes from true to false, so indeterminate loading must be explicit. Value/range/format/size props remain, color primary becomes accent and secondary is removed; root strokeWidth moves to both circle parts, while labels and value displays require explicit composition/render props.
- **Finding lines:** `14-16, 51-78, 106-126, 128-154, 158-180, 219-228` in the reviewed text.

### 111. [migration/code](https://heroui.com/en/docs/react/migration/code)

- **Group / pass:** `migration` / `migration-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/code.mdx` — `pinned-source-mdx`, 8,968 bytes.
- **Full-read lines:** `1-287`; **delivery chunks:** `1-200, 201-287`.
- **Reviewed SHA-256:** `eb2552ebf986c02ee1b9e7740f203a4583b0c137c8b271f517c34267a2607f79`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/code.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/code.mdx`; SHA-256 `eb2552ebf986c02ee1b9e7740f203a4583b0c137c8b271f517c34267a2607f79`.
- **Saved reader acquisition:** `docs/migration/code.mdx`; 9,683 bytes; SHA-256 `a737f7ba85e4e5e32517d2572b9eef56cf8a5e3f42110b54574e881353fa3c42`.
- **Finding:** The guide removes the v2 Code import from @heroui/react rather than renaming it: v3 uses native code elements with explicit Tailwind color, size, radius and base typography/layout classes. Primary maps to accent classes and secondary to default styling. Its optional locally defined Code wrapper illustrates application-owned reuse; it does not contradict the removal of the library component.
- **Finding lines:** `6-36, 50-60, 114-184, 261-287` in the reviewed text.

### 112. [migration/date-picker](https://heroui.com/en/docs/react/migration/date-picker)

- **Group / pass:** `migration` / `migration-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/date-picker.mdx` — `pinned-source-mdx`, 14,805 bytes.
- **Full-read lines:** `1-457`; **delivery chunks:** `1-200, 201-400, 401-457`.
- **Reviewed SHA-256:** `471bf6923e5ef1ab960537300d5fe00c46be57a9233aa68111cfd5cb0fb3c89c`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/date-picker.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/date-picker.mdx`; SHA-256 `471bf6923e5ef1ab960537300d5fe00c46be57a9233aa68111cfd5cb0fb3c89c`.
- **Saved reader acquisition:** `docs/migration/date-picker.mdx`; 18,713 bytes; SHA-256 `ab2cb44b9fa097f2c832cbab1330d3e36a7ae1b9a756661c0d736ca6d10f1e49`.
- **Finding:** The guide replaces v2's all-in-one DatePicker with a state-owning DatePicker root plus explicitly composed DateField input segments, trigger/popover, Calendar, and label/error parts. Value/change/date-constraint props stay; visibleMonths moves to Calendar.visibleDuration, showMonthAndYearPickers becomes year-trigger/grid composition, and validate/timeInputProps become external validation/separately composed time input.
- **Finding lines:** `72-88, 94-131, 328-381` in the reviewed text.

### 113. [migration/date-range-picker](https://heroui.com/en/docs/react/migration/date-range-picker)

- **Group / pass:** `migration` / `migration-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/date-range-picker.mdx` — `pinned-source-mdx`, 18,902 bytes.
- **Full-read lines:** `1-522`; **delivery chunks:** `1-200, 201-400, 401-522`.
- **Reviewed SHA-256:** `d5c4dcde492d9bfc61a6ddcf995e5d926fe12ae98aa37bd8ced1afd9a61e7392`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/date-range-picker.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/date-range-picker.mdx`; SHA-256 `d5c4dcde492d9bfc61a6ddcf995e5d926fe12ae98aa37bd8ced1afd9a61e7392`.
- **Saved reader acquisition:** `docs/migration/date-range-picker.mdx`; 23,833 bytes; SHA-256 `5409b03dba49bbd88ef238ae12dd0b1ebf0a40c45e7b1b4ed69fdd0ca441a002`.
- **Finding:** v3 composes two DateField.Input children with start/end slots inside InputContainer plus an explicit RangeSeparator, while the root's controlled {start, end} value shape is retained. Calendar-specific allowsNonContiguousRanges/pageBehavior move to RangeCalendar; the two-month example replaces visibleMonths={2} with visibleDuration={{months: 2}} AND a second RangeCalendar.Grid with offset={{months: 1}}.
- **Finding lines:** `78-96, 103-142, 205-245, 369-433` in the reviewed text.

### 114. [migration/dateinput](https://heroui.com/en/docs/react/migration/dateinput)

- **Group / pass:** `migration` / `migration-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/dateinput.mdx` — `pinned-source-mdx`, 9,933 bytes.
- **Full-read lines:** `1-342`; **delivery chunks:** `1-200, 201-342`.
- **Reviewed SHA-256:** `5eac8efa80ddf27656264c2525475728843ace56c3b9bbb41bb3c0befdd63d03`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/dateinput.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/dateinput.mdx`; SHA-256 `5eac8efa80ddf27656264c2525475728843ace56c3b9bbb41bb3c0befdd63d03`.
- **Saved reader acquisition:** `docs/migration/dateinput.mdx`; 12,628 bytes; SHA-256 `d35dd2900fd7f76b788caed553e695c9169b3f5a06c14f4a82744c31d90d8803`.
- **Finding:** DateInput is renamed DateField and this guide explicitly imports a separate DateInputGroup with Input/Segment render-prop composition. Date values, bounds, granularity, validationBehavior, and field state remain on DateField; variant moves to DateInputGroup and is limited to primary/secondary, while startContent/endContent become Prefix/Suffix children and wrapper/classNames props give way to direct part props.
- **Finding lines:** `22-39, 43-79, 333-342` in the reviewed text.

### 115. [migration/divider](https://heroui.com/en/docs/react/migration/divider)

- **Group / pass:** `migration` / `migration-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/divider.mdx` — `pinned-source-mdx`, 2,276 bytes.
- **Full-read lines:** `1-99`; **delivery chunks:** `1-99`.
- **Reviewed SHA-256:** `0454ae0474b948f5197ae4c1d1501ec79320f13757495111d38279a4b4d09871`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/divider.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/divider.mdx`; SHA-256 `0454ae0474b948f5197ae4c1d1501ec79320f13757495111d38279a4b4d09871`.
- **Saved reader acquisition:** `docs/migration/divider.mdx`; 2,711 bytes; SHA-256 `6ef0ac648027641e6904d242b600ca9cb15fd87f0bd5ed08e814dc168165df0b`.
- **Finding:** Divider is renamed Separator, including its import and JSX name. The guide preserves orientation and className and adds the optional default/secondary/tertiary variant prop for emphasis; this is a rename plus an additive styling capability rather than the compound restructuring used by many other migration pages.
- **Finding lines:** `10-32, 94-99` in the reviewed text.

### 116. [migration/drawer](https://heroui.com/en/docs/react/migration/drawer)

- **Group / pass:** `migration` / `migration-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/drawer.mdx` — `pinned-source-mdx`, 12,807 bytes.
- **Full-read lines:** `1-427`; **delivery chunks:** `1-200, 201-400, 401-427`.
- **Reviewed SHA-256:** `0b92197932222cc242a40f53ec1471aae93a7e4169fbb9707f51e33940c63d76`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/drawer.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/drawer.mdx`; SHA-256 `0b92197932222cc242a40f53ec1471aae93a7e4169fbb9707f51e33940c63d76`.
- **Saved reader acquisition:** `docs/migration/drawer.mdx`; 15,719 bytes; SHA-256 `9b3cd03ea567435ae0162b7c9032a5c35dcf213fba06646292bea0fe7f60d480`.
- **Finding:** The guide replaces v2's render callback/useDisclosure structure with Drawer.Backdrop > Content > Dialog composition, useOverlayState or a built-in trigger, and new drag/close parts. Placement moves to Content and defaults to bottom instead of right; open/dismissal props move to Backdrop, scroll blocking is documented as unconditional, motionProps gives way to CSS animations, and portalContainer is removed.
- **Finding lines:** `78-125, 283-308, 415-427` in the reviewed text.

### 117. [migration/dropdown](https://heroui.com/en/docs/react/migration/dropdown)

- **Group / pass:** `migration` / `migration-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/dropdown.mdx` — `pinned-source-mdx`, 14,352 bytes.
- **Full-read lines:** `1-466`; **delivery chunks:** `1-200, 201-400, 401-466`.
- **Reviewed SHA-256:** `eea2f6b730f60a12cad7634fd0a7d37fe1490dfd19198631795d9220914d7d11`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/dropdown.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/dropdown.mdx`; SHA-256 `eea2f6b730f60a12cad7634fd0a7d37fe1490dfd19198631795d9220914d7d11`.
- **Saved reader acquisition:** `docs/migration/dropdown.mdx`; 15,758 bytes; SHA-256 `70a9e8e39d278be3c76fc463f2bd9c3cadec3b465c03e29921bd9b850e06b24e`.
- **Finding:** Separate v2 Dropdown exports become compound parts with a required Popover wrapper. Item state/focus identity moves to id while React key remains necessary for lists; Label, textValue, Description, Kbd slot=keyboard, and ItemIndicator replace implicit content/prop conventions. v3 adds SubmenuTrigger/SubmenuIndicator composition, while the table explicitly says press/longPress trigger support is retained rather than newly introduced.
- **Finding lines:** `60-101, 321-385, 403-420, 424-466` in the reviewed text.

### 118. [migration/form](https://heroui.com/en/docs/react/migration/form)

- **Group / pass:** `migration` / `migration-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/form.mdx` — `pinned-source-mdx`, 3,178 bytes.
- **Full-read lines:** `1-116`; **delivery chunks:** `1-116`.
- **Reviewed SHA-256:** `6518cc025f85d5f00ee1b6ed6e3e815349d586e5597afdc3f67c8b59dd4dfee1`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/form.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/form.mdx`; SHA-256 `6518cc025f85d5f00ee1b6ed6e3e815349d586e5597afdc3f67c8b59dd4dfee1`.
- **Saved reader acquisition:** `docs/migration/form.mdx`; 3,968 bytes; SHA-256 `bbc499722c8e02c16ebd001cfdaddfe4ad6a15f2f584d16d556008d8a5e4575e`.
- **Finding:** Form is documented as nonbreaking for existing usage: validationBehavior, validationErrors, submit/reset handlers, and native form props remain. v3 adds onInvalid; the guide says validation failure focuses the first invalid field by default and e.preventDefault() customizes that behavior. Its unchanged-Form guidance explicitly excludes the separately migrating field components inside the form.
- **Finding lines:** `14-27, 85-116` in the reviewed text.

### 119. [migration/full-migration](https://heroui.com/en/docs/react/migration/full-migration)

- **Group / pass:** `migration` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(workflows)/full-migration.mdx` — `pinned-source-mdx`, 15,285 bytes.
- **Full-read lines:** `1-509`; **delivery chunks:** `1-509`.
- **Reviewed SHA-256:** `a3de8cea00b8eb97fab5fba0d7d72c2917d2e343981cd31f74e92052f9455cf9`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28workflows%29/full-migration.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(workflows)/full-migration.mdx`; SHA-256 `a3de8cea00b8eb97fab5fba0d7d72c2917d2e343981cd31f74e92052f9455cf9`.
- **Saved reader acquisition:** `docs/migration/full-migration.mdx`; 16,155 bytes; SHA-256 `a984c30248c7226bee2d2f7e8f6cd743ebacc088f90088f33d50ee42cbcb116a`.
- **Finding:** The workflow replaces v2 dependencies/provider/plugin setup with v3 composition and CSS, but still contains asChild and --color-primary guidance that conflicts with the current render and --accent contracts.
- **Finding lines:** `1-509` in the reviewed text.

### 120. [migration/hooks](https://heroui.com/en/docs/react/migration/hooks)

- **Group / pass:** `migration` / `migration-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/hooks.mdx` — `pinned-source-mdx`, 8,584 bytes.
- **Full-read lines:** `1-282`; **delivery chunks:** `1-200, 201-282`.
- **Reviewed SHA-256:** `f46a317023661fca2f21c269d68bc6069dcf4809c4cce3d95064a46026b35fe2`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/hooks.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/hooks.mdx`; SHA-256 `f46a317023661fca2f21c269d68bc6069dcf4809c4cce3d95064a46026b35fe2`.
- **Saved reader acquisition:** `docs/migration/hooks.mdx`; 9,176 bytes; SHA-256 `ebfe2e272768bebae7adb205ed76f9119acab3b4d91009a723fc2b511f6ffb49`.
- **Finding:** v3 removes component prop-getter hooks in favor of compound parts and explicitly says to preserve only the parts used by the original custom structure. useDisclosure becomes useOverlayState: the controlled hook option onChange becomes onOpenChange; returned onOpen/onClose/onOpenChange actions become open/close/toggle, setOpen handles boolean updates, and disclosure getters/isControlled are removed. useDraggable, useClipboard, usePagination, and useToast are also listed as removed.
- **Finding lines:** `18-38, 81-137, 184-230, 265-279` in the reviewed text.

### 121. [migration/image](https://heroui.com/en/docs/react/migration/image)

- **Group / pass:** `migration` / `migration-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/image.mdx` — `pinned-source-mdx`, 12,955 bytes.
- **Full-read lines:** `1-522`; **delivery chunks:** `1-200, 201-400, 401-522`.
- **Reviewed SHA-256:** `703977409a6e9194fe0199c892ef42f9b3e41e1f55100f865c16a6e55c6da561`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/image.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/image.mdx`; SHA-256 `703977409a6e9194fe0199c892ef42f9b3e41e1f55100f865c16a6e55c6da561`.
- **Saved reader acquisition:** `docs/migration/image.mdx`; 13,687 bytes; SHA-256 `5989cddfd2bee6735f0d46cbf3dcf9da71b9edf0c7fbdba76818ef93588b7198`.
- **Finding:** HeroUI's Image component is removed, with migration to native img or next/image rather than another HeroUI image API. Radius/shadow/blur/zoom become CSS composition and fallback/skeleton handling becomes application-owned state; decorative blurred duplicates use empty alt plus aria-hidden. The reusable CustomImage is explicitly an optional inline application example, not a replacement HeroUI export.
- **Finding lines:** `6-29, 121-175, 186-226, 271-299, 483-498` in the reviewed text.

### 122. [migration/incremental-migration](https://heroui.com/en/docs/react/migration/incremental-migration)

- **Group / pass:** `migration` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(workflows)/incremental-migration.mdx` — `pinned-source-mdx`, 10,511 bytes.
- **Full-read lines:** `1-292`; **delivery chunks:** `1-292`.
- **Reviewed SHA-256:** `cfff087c7c1375481431afad735aa4987f7dbe320dbbe3d5beec9759e40efc65`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28workflows%29/incremental-migration.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(workflows)/incremental-migration.mdx`; SHA-256 `cfff087c7c1375481431afad735aa4987f7dbe320dbbe3d5beec9759e40efc65`.
- **Saved reader acquisition:** `docs/migration/incremental-migration.mdx`; 10,821 bytes; SHA-256 `39369548fe64a8760293352c92e82b5a26348595282c757fceb3428c43ca8a92`.
- **Finding:** Coexistence uses pnpm aliases or per-component packages and explicitly carries two styling systems; retained v2-only components remain dependent on v2 until separately replaced before removing v2.
- **Finding lines:** `1-292` in the reviewed text.

### 123. [migration/input](https://heroui.com/en/docs/react/migration/input)

- **Group / pass:** `migration` / `migration-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/input.mdx` — `pinned-source-mdx`, 8,138 bytes.
- **Full-read lines:** `1-281`; **delivery chunks:** `1-200, 201-281`.
- **Reviewed SHA-256:** `76c4be196a51cd98ff5b1a7f52def88e5dd68e271eae5418a6abf996e933e5e6`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/input.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/input.mdx`; SHA-256 `76c4be196a51cd98ff5b1a7f52def88e5dd68e271eae5418a6abf996e933e5e6`.
- **Saved reader acquisition:** `docs/migration/input.mdx`; 10,701 bytes; SHA-256 `bdb4956bc7ff1b6a8ccafdb06ab2fb2f180d73c368995960b2d83261b7f1282f`.
- **Finding:** v2's full-featured Input splits into a primitive Input and a TextField owning labels, required/invalid state, and validate. onValueChange becomes an Input onChange event handler reading e.target.value; variants narrow to primary/secondary but fullWidth remains on both Input and TextField. Prefix/suffix content moves to InputGroup parts, and isClearable becomes manually controlled Input state plus CloseButton.
- **Finding lines:** `10-32, 77-92, 173-192, 194-227, 231-261` in the reviewed text.

### 124. [migration/input-otp](https://heroui.com/en/docs/react/migration/input-otp)

- **Group / pass:** `migration` / `migration-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/input-otp.mdx` — `pinned-source-mdx`, 8,060 bytes.
- **Full-read lines:** `1-275`; **delivery chunks:** `1-200, 201-275`.
- **Reviewed SHA-256:** `5bb92638dc8fba09ce23af9f13d3ee82e38bb522bd08112f0b66da6549e228f5`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/input-otp.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/input-otp.mdx`; SHA-256 `5bb92638dc8fba09ce23af9f13d3ee82e38bb522bd08112f0b66da6549e228f5`.
- **Saved reader acquisition:** `docs/migration/input-otp.mdx`; 9,226 bytes; SHA-256 `a8d7c301ef8a5fef5967237515d3bcfcf3f3f42956a0a7c38895fda164e50ec1`.
- **Finding:** The guide replaces v2 InputOtp's generated segments with InputOTP.Group and indexed InputOTP.Slot children; length, allowedKeys, and onValueChange become maxLength, pattern, and onChange. Description/error output becomes separate composition, variants narrow to primary/secondary, and textAlign, inputMode, placeholder, and pasteTransformer are documented additions. The paired character-pattern example broadens lowercase-only validation to the documented mixed-case helper.
- **Finding lines:** `12-62, 96-118, 213-259, 263-275` in the reviewed text.
- **Documentation caveat (lines 96-118, 257-259):** The paired allowed-keys example uses v2 allowedKeys="^[a-z]*$" (lowercase only) but v3 pattern={REGEXP_ONLY_CHARS}; the same page defines that helper as accepting a-z and A-Z. As written, the suggested substitution broadens accepted characters. This is an intra-page example mismatch, not a verified runtime defect.

### 125. [migration/kbd](https://heroui.com/en/docs/react/migration/kbd)

- **Group / pass:** `migration` / `migration-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/kbd.mdx` — `pinned-source-mdx`, 3,401 bytes.
- **Full-read lines:** `1-134`; **delivery chunks:** `1-134`.
- **Reviewed SHA-256:** `f7861f6acc53d793e9679656c20967e2dfb91ce8546f1c2ccb384bab160b0a03`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/kbd.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/kbd.mdx`; SHA-256 `f7861f6acc53d793e9679656c20967e2dfb91ce8546f1c2ccb384bab160b0a03`.
- **Saved reader acquisition:** `docs/migration/kbd.mdx`; 3,916 bytes; SHA-256 `68d323894d5bc64cf329308ed29f289107d90815c54a313d160531b555a9c14c`.
- **Finding:** v2's keys array and automatic modifier rendering become explicit Kbd.Abbr keyValue children in v3; non-modifier text is wrapped in Kbd.Key or Kbd.Content, which the guide explicitly treats as interchangeable. Styling moves from classNames to per-part className, default/light variants are added, and keyValue is documented to retain v2's keyboard-key vocabulary.
- **Finding lines:** `12-51, 77-98, 111-134` in the reviewed text.

### 126. [migration/link](https://heroui.com/en/docs/react/migration/link)

- **Group / pass:** `migration` / `migration-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/link.mdx` — `pinned-source-mdx`, 4,452 bytes.
- **Full-read lines:** `1-186`; **delivery chunks:** `1-186`.
- **Reviewed SHA-256:** `b040b599c802ba5703fa17674bf172b7b3125f8136ac3e67c35132181cae31dc`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/link.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/link.mdx`; SHA-256 `b040b599c802ba5703fa17674bf172b7b3125f8136ac3e67c35132181cae31dc`.
- **Saved reader acquisition:** `docs/migration/link.mdx`; 5,044 bytes; SHA-256 `fb56b14aa03ee86efbc168a58dc79c640d8066f8e02b8d7e1b640ee0badb61f8`.
- **Finding:** Basic Link usage is retained, but showAnchorIcon/anchorIcon become Link.Icon and isExternal becomes explicit target="_blank" plus rel="noopener noreferrer". v3 removes size/color/block/underline/animation props, documents hover underlining by default and a new onPress handler, and explicitly rejects as/asChild router composition: the example instead styles NextLink itself with className="link".
- **Finding lines:** `19-29, 33-51, 55-116, 140-164, 178-186` in the reviewed text.

### 127. [migration/listbox](https://heroui.com/en/docs/react/migration/listbox)

- **Group / pass:** `migration` / `migration-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/listbox.mdx` — `pinned-source-mdx`, 11,020 bytes.
- **Full-read lines:** `1-392`; **delivery chunks:** `1-200, 201-392`.
- **Reviewed SHA-256:** `45f503aabea10ac077b9611d09e3003ce4c0aec70641f72c48b08286984f6988`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/listbox.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/listbox.mdx`; SHA-256 `45f503aabea10ac077b9611d09e3003ce4c0aec70641f72c48b08286984f6988`.
- **Saved reader acquisition:** `docs/migration/listbox.mdx`; 12,456 bytes; SHA-256 `1e2c8a92a2f6dfc3c354090c576d692f2fb69132ba165eb6af759eb9770aa737`.
- **Finding:** Listbox/ListboxItem/ListboxSection become ListBox and compound Item/Section parts. v3 separates id-based state/focus identity from React key, uses textValue for non-plain-text type-ahead, and composes labels, descriptions, headers, icons, and selection indicators. The documented default/danger variant can be inherited from the root and overridden per item; virtualization moves from HeroUI props to React Aria Virtualizer. The page is internally inconsistent about optional parts, whether onAction is new, and the historical selection representation.
- **Finding lines:** `48-75, 113-150, 203-274, 295-327, 342-392` in the reviewed text.
- **Documentation caveat (lines 68-72, 368-378, 382-384):** The summary says items 'Must use Label, Description, ListBox.ItemIndicator' (383), but the anatomy marks Description and ItemIndicator optional (373-374), and the prop table explicitly says to omit ItemIndicator to hide selection (72). The discrepancy is in the guide's requirement wording.
- **Documentation caveat (lines 60-65, 385-389):** The prop table places onAction under 'v2 Prop' and maps it to ListBox (60-65), while the summary calls it a new callback (387). The assigned text does not consistently establish whether this callback is new in v3.
- **Documentation caveat (lines 75-75, 81-109, 390-392):** The summary says Selection uses a Set 'instead of arrays' (392), but the table calls selectedKeys the same (75), and both v2 selection examples already use new Set (87 and 99). This conflicts with the page's own historical examples; it does not establish a current selection defect.

### 128. [migration/mcp-server](https://heroui.com/en/docs/react/migration/mcp-server)

- **Group / pass:** `migration` / `migration-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(migration-for-agents)/mcp-server.mdx` — `pinned-source-mdx`, 5,896 bytes.
- **Full-read lines:** `1-175`; **delivery chunks:** `1-175`.
- **Reviewed SHA-256:** `a263e9e6769bef0aff60806fcd36229c14323067aa363bf77e510352014d6fcc`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28migration-for-agents%29/mcp-server.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(migration-for-agents)/mcp-server.mdx`; SHA-256 `a263e9e6769bef0aff60806fcd36229c14323067aa363bf77e510352014d6fcc`.
- **Saved reader acquisition:** `docs/migration/mcp-server.mdx`; 7,276 bytes; SHA-256 `7877bf15a93374e04b7f2bde5a1ea5357a98305bae2c6982ff5971394fdcd41a`.
- **Finding:** This is the v2-to-v3 migration tooling guide: it documents a migration-only Streamable HTTP endpoint at https://migration-mcp.heroui.com, full/incremental workflow modes, component/styling/hooks tools, and the hook delta useDisclosure to useOverlayState. It prescribes analyze-and-plan before implement-migration with approval checkpoints, then switching to the HeroUI React MCP for post-migration v3 development. The stated catalog size of 39 guides and endpoint behavior were read, not independently verified.
- **Finding lines:** `6-12, 148-169` in the reviewed text.

### 129. [migration/modal](https://heroui.com/en/docs/react/migration/modal)

- **Group / pass:** `migration` / `migration-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/modal.mdx` — `pinned-source-mdx`, 15,075 bytes.
- **Full-read lines:** `1-492`; **delivery chunks:** `1-200, 201-400, 401-492`.
- **Reviewed SHA-256:** `ddd74d76d4691f34b74369734978109740f56b5611dd4dcb66f94106802a3966`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/modal.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/modal.mdx`; SHA-256 `ddd74d76d4691f34b74369734978109740f56b5611dd4dcb66f94106802a3966`.
- **Saved reader acquisition:** `docs/migration/modal.mdx`; 17,046 bytes; SHA-256 `ee44997ca098ccb5a36f6b7704e6600f5d88e64be92d86a40d0c531ca5a1c57d`.
- **Finding:** v2's separate Modal parts and useDisclosure wiring become a Backdrop > Container > Dialog composition with a direct Button or Modal.Trigger documented to open automatically. useOverlayState replaces useDisclosure; explicit isOpen/onOpenChange move to Backdrop, or callers pass state to the Modal root. Backdrop variant and dismiss controls belong on Backdrop; size, placement, and renamed scroll belong on Container. Close-button props become explicit CloseTrigger composition, while Dialog exposes a close render prop; motionProps and portalContainer are removed.
- **Finding lines:** `35-71, 86-126, 128-200, 225-301, 354-389, 482-492` in the reviewed text.

### 130. [migration/navbar](https://heroui.com/en/docs/react/migration/navbar)

- **Group / pass:** `migration` / `migration-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/navbar.mdx` — `pinned-source-mdx`, 19,029 bytes.
- **Full-read lines:** `1-645`; **delivery chunks:** `1-200, 201-400, 401-600, 601-645`.
- **Reviewed SHA-256:** `1a81194deec02332d2bcf2990cde2548fa51472e2d3e16f486a8464d21c68ce5`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/navbar.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/navbar.mdx`; SHA-256 `1a81194deec02332d2bcf2990cde2548fa51472e2d3e16f486a8464d21c68ce5`.
- **Saved reader acquisition:** `docs/migration/navbar.mdx`; 19,447 bytes; SHA-256 `f9e561c60b4735bfa665c2b59fd9bb59044595b2e59b87b6d96884e92bce01e7`.
- **Finding:** The entire v2 Navbar family is documented as removed in v3. Migration requires native nav/list/button markup, Tailwind styling, and application-owned mobile-menu state; hide-on-scroll, animations, and scroll blocking require custom implementation. The later Navbar export is an explicitly simplified application wrapper, not a HeroUI export. Inline advanced examples show a scroll-direction hook and a body-overflow effect, so the guide transfers those responsibilities to the application rather than documenting automatic parity.
- **Finding lines:** `6-37, 276-294, 375-440, 527-584, 587-604` in the reviewed text.

### 131. [migration/numberinput](https://heroui.com/en/docs/react/migration/numberinput)

- **Group / pass:** `migration` / `migration-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/numberinput.mdx` — `pinned-source-mdx`, 7,295 bytes.
- **Full-read lines:** `1-272`; **delivery chunks:** `1-200, 201-272`.
- **Reviewed SHA-256:** `b10be7fecdd12f906c2d3936908963bee7fc96b0698cc5f15015b9f30d80c1b8`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/numberinput.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/numberinput.mdx`; SHA-256 `b10be7fecdd12f906c2d3936908963bee7fc96b0698cc5f15015b9f30d80c1b8`.
- **Saved reader acquisition:** `docs/migration/numberinput.mdx`; 8,694 bytes; SHA-256 `fa5fc81047d0287cf5151df515961cd2905e579839bef3af76c7e101f1724ce6`.
- **Finding:** NumberInput becomes NumberField with Group/Input and explicitly composed stepper buttons, Label, Description, and FieldError; onValueChange becomes onChange. The paired examples retain minValue/maxValue, step, and formatOptions on the root. Variants narrow to primary/secondary, hideStepper becomes omission of the buttons, and clear behavior/content placement become manual; isWheelDisabled is listed as removed. Summary wording overstates the button requirement despite the explicit no-stepper example.
- **Finding lines:** `12-71, 97-131, 136-244, 263-272` in the reviewed text.
- **Documentation caveat (lines 68-68, 169-187, 263-271):** The summary's unqualified 'Must explicitly include' both stepper buttons (266) conflicts with the prop table's omit-buttons mapping (68), the 'Without Stepper Buttons' example (169-187), and the same summary's instruction to omit buttons instead of hideStepper (271). This is imprecise requirement wording; the page itself documents a button-free composition.

### 132. [migration/pagination](https://heroui.com/en/docs/react/migration/pagination)

- **Group / pass:** `migration` / `migration-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/pagination.mdx` — `pinned-source-mdx`, 12,747 bytes.
- **Full-read lines:** `1-424`; **delivery chunks:** `1-200, 201-400, 401-424`.
- **Reviewed SHA-256:** `643f11abb441482a50ec546ab9328b6c28eb209f7cd6a3995d357d63f7d81fc0`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/pagination.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/pagination.mdx`; SHA-256 `643f11abb441482a50ec546ab9328b6c28eb209f7cd6a3995d357d63f7d81fc0`.
- **Saved reader acquisition:** `docs/migration/pagination.mdx`; 15,520 bytes; SHA-256 `4843bfaaa3a750cff119bd06dbc1bbf5588f9578f3a0891036d028af14cd8415`.
- **Finding:** v2's generated pages and usePagination hook are replaced by caller-owned state/page-window logic and compound Content/Item/Link/Previous/Next/Ellipsis parts. total/siblings/boundaries and root onChange disappear; each link gets isActive/onPress, disabled state and aria-labels become per-item, and loop/ellipsis jumping require manual logic. Root size retains sm/md/lg. Documented additions include Summary result-count content and custom children in PreviousIcon/NextIcon; examples explicitly wire boundary disabling and clamped navigation.
- **Finding lines:** `66-105, 119-181, 186-250, 294-353, 403-424` in the reviewed text.

### 133. [migration/popover](https://heroui.com/en/docs/react/migration/popover)

- **Group / pass:** `migration` / `migration-04`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/popover.mdx` — `pinned-source-mdx`, 7,692 bytes.
- **Full-read lines:** `1-279`; **delivery chunks:** `1-200, 201-279`.
- **Reviewed SHA-256:** `cb006f77e1cca222f556f1ed27a0e375eb5dbde4d3d5e8f062fbabe221a83765`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/popover.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/popover.mdx`; SHA-256 `cb006f77e1cca222f556f1ed27a0e375eb5dbde4d3d5e8f062fbabe221a83765`.
- **Saved reader acquisition:** `docs/migration/popover.mdx`; 9,346 bytes; SHA-256 `94b942d9d39ebd8b33460d9137b90d50ef981966b7a6a3b90aa58344501ce8e9`.
- **Finding:** Separate PopoverTrigger/PopoverContent exports become compound Trigger/Content/Dialog/Heading/Arrow parts, with a direct Button also supported. placement/offset/shouldFlip move to Content, but isOpen/defaultOpen/onOpenChange stay on the root. showArrow becomes an explicit Arrow, onClose is mapped to the closing branch of onOpenChange, and Content/Arrow gain documented render overrides. Styling/backdrop/motion props are removed. Arrow nesting is inconsistent across the page's examples and anatomy.
- **Finding lines:** `12-74, 102-134, 164-199, 201-266, 270-279` in the reviewed text.
- **Documentation caveat (lines 104-123, 224-232, 236-250):** The earlier arrow examples and component anatomy nest Popover.Arrow inside Popover.Dialog (104-123, 225-231), while the new-capabilities example places Arrow directly under Popover.Content beside Dialog (240-250). The page presents two nesting patterns without explaining whether both are supported. This is a documentation inconsistency/ambiguity, not proof that either placement fails at runtime.

### 134. [migration/progress](https://heroui.com/en/docs/react/migration/progress)

- **Group / pass:** `migration` / `migration-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/progress.mdx` — `pinned-source-mdx`, 5,604 bytes.
- **Full-read lines:** `1-223`; **delivery chunks:** `1-200, 201-223`.
- **Reviewed SHA-256:** `704393d2b9f00fd740c0c679124458ab03bb189220696f0a246b8b353046a9e4`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/progress.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/progress.mdx`; SHA-256 `704393d2b9f00fd740c0c679124458ab03bb189220696f0a246b8b353046a9e4`.
- **Saved reader acquisition:** `docs/migration/progress.mdx`; 6,712 bytes; SHA-256 `4a661c69ba9657c56f263a0500dd653ff568298a3e70674873d4567c5eb27911`.
- **Finding:** v2 Progress becomes v3 ProgressBar with explicit Label, Output, Track and Fill; showValueLabel becomes inclusion or omission of Output. The guide retains value/range/format props and sm/md/lg sizes, changes color primary to accent, removes secondary and several styling/disabled/animation props, and replaces classNames with per-part className.
- **Finding lines:** `14-55, 57-80, 193-223` in the reviewed text.

### 135. [migration/radio](https://heroui.com/en/docs/react/migration/radio)

- **Group / pass:** `migration` / `migration-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/radio.mdx` — `pinned-source-mdx`, 7,905 bytes.
- **Full-read lines:** `1-305`; **delivery chunks:** `1-200, 201-305`.
- **Reviewed SHA-256:** `260647866bec8557fe9a2ebe6c0de1c83315c86d9b01e58f0c529569c2e8880f`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/radio.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/radio.mdx`; SHA-256 `260647866bec8557fe9a2ebe6c0de1c83315c86d9b01e58f0c529569c2e8880f`.
- **Saved reader acquisition:** `docs/migration/radio.mdx`; 8,952 bytes; SHA-256 `6662574a5165e47cff9be6006135dbe7f187f60b3edb017536230ea555c845ec`.
- **Finding:** v3 replaces the simple Radio with Radio.Content containing Control and Indicator, and moves description text to a Description sibling of Content. RadioGroup labeling and errors become Label and FieldError children, onValueChange becomes onChange, and size/color/classNames are removed. The guide adds group-level primary/secondary variants and documents isReadOnly as preventing changes while preserving focusability.
- **Finding lines:** `27-77, 103-133, 221-255, 295-305` in the reviewed text.

### 136. [migration/radio-group](https://heroui.com/en/docs/react/migration/radio-group)

- **Group / pass:** `migration` / `migration-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/radio-group.mdx` — `pinned-source-mdx`, 6,933 bytes.
- **Full-read lines:** `1-270`; **delivery chunks:** `1-200, 201-270`.
- **Reviewed SHA-256:** `2c150b8aa8790f4e10c4db279e6ec9d501180dbc060506fa6dfc6bcd706e74f2`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/radio-group.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/radio-group.mdx`; SHA-256 `2c150b8aa8790f4e10c4db279e6ec9d501180dbc060506fa6dfc6bcd706e74f2`.
- **Saved reader acquisition:** `docs/migration/radio-group.mdx`; 7,205 bytes; SHA-256 `3efe316237fff394c84702f165d448cae068dc119b2e2df59cc9883a8122ae01`.
- **Finding:** RadioGroup replaces its label prop with Label; individual Radio descriptions become Description siblings of Radio.Content, and Radio children become compound components. Its controlled example keeps a string value but replaces onValueChange with onChange. The guide specifically requires name for form integration and adds primary/secondary variants plus isReadOnly, documented to retain focusability while preventing value changes.
- **Finding lines:** `69-99, 215-259, 261-270` in the reviewed text.

### 137. [migration/range-calendar](https://heroui.com/en/docs/react/migration/range-calendar)

- **Group / pass:** `migration` / `migration-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/range-calendar.mdx` — `pinned-source-mdx`, 14,246 bytes.
- **Full-read lines:** `1-446`; **delivery chunks:** `1-200, 201-400, 401-446`.
- **Reviewed SHA-256:** `bf8be6bc7229dd644aaf64118fbdc47af0e9cf82a7e0974ca7bb509f447beb8f`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/range-calendar.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/range-calendar.mdx`; SHA-256 `bf8be6bc7229dd644aaf64118fbdc47af0e9cf82a7e0974ca7bb509f447beb8f`.
- **Saved reader acquisition:** `docs/migration/range-calendar.mdx`; 16,922 bytes; SHA-256 `a6db0ea230c7bdcb9e30df3d50cc280570d0a65e40821bb66471ab7db9119057`.
- **Finding:** v3 exposes calendar header/navigation/grid/cell composition while preserving range state, unavailable-date and non-contiguous-range props. visibleMonths={n} becomes visibleDuration={{months: n}} plus separately rendered grids with month offsets. showMonthAndYearPickers becomes year-picker components, onHeaderExpandedChange becomes onYearPickerOpenChange, and the table directs firstDayOfWeek users to I18nProvider locale and errorMessage users to external validation. Top/bottom content and slot styling move into children and per-part className.
- **Finding lines:** `64-105, 211-249, 251-291, 437-446` in the reviewed text.

### 138. [migration/scroll-shadow](https://heroui.com/en/docs/react/migration/scroll-shadow)

- **Group / pass:** `migration` / `migration-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/scroll-shadow.mdx` — `pinned-source-mdx`, 3,527 bytes.
- **Full-read lines:** `1-148`; **delivery chunks:** `1-148`.
- **Reviewed SHA-256:** `fe524ce90decf859065507104d0703ec519266d157bcdd571a9a85fa16c06e2d`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/scroll-shadow.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/scroll-shadow.mdx`; SHA-256 `fe524ce90decf859065507104d0703ec519266d157bcdd571a9a85fa16c06e2d`.
- **Saved reader acquisition:** `docs/migration/scroll-shadow.mdx`; 3,806 bytes; SHA-256 `0db285fbcd7443e96fe2a696a8edfb23a577f84b10398e56182ccc0d5d9f3e0b`.
- **Finding:** The guide preserves ScrollShadow's wrapper structure and vertical/horizontal orientation while changing the import from @heroui/scroll-shadow to @heroui/react. It presents enhanced visibility control and onVisibilityChange, pixel size (default 40), offset (0), isEnabled (true), hideScrollBar and variant (fade). Its claim that these are new needs qualification because its own v2 example already names hideScrollBar.
- **Finding lines:** `26-65, 88-118, 122-148` in the reviewed text.
- **Documentation caveat (lines 59-65, 124-129):** The 'New props available' list includes hideScrollBar, but the v2 Variant example already names hideScrollBar as a v2 theme variant. The page does not explain a variant-to-prop distinction. This is inconsistent novelty wording, not evidence of a current v3 API or runtime defect.

### 139. [migration/select](https://heroui.com/en/docs/react/migration/select)

- **Group / pass:** `migration` / `migration-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/select.mdx` — `pinned-source-mdx`, 16,167 bytes.
- **Full-read lines:** `1-544`; **delivery chunks:** `1-200, 201-400, 401-544`.
- **Reviewed SHA-256:** `e98cca07c0d8dddec8e4036e4289b10ec543ba6bc9d2878c0061e4b03d705097`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/select.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/select.mdx`; SHA-256 `e98cca07c0d8dddec8e4036e4289b10ec543ba6bc9d2878c0061e4b03d705097`.
- **Saved reader acquisition:** `docs/migration/select.mdx`; 18,742 bytes; SHA-256 `7d1e9fdd8e95c44ece0a78d6a10f35889f1d34fd9ce12a62b422ff986b5bfbd8`.
- **Finding:** v3 Select composes Trigger/Value/Indicator/Popover with ListBox.Item and Section, replacing SelectItem/SelectSection. selectedKeys/onSelectionChange/defaultSelectedKeys become value/onChange/defaultValue; single selection uses Key | null and multiple uses Key[]. Items use id for state/focus, textValue for accessibility and React key for reconciliation. Labels/errors move to components; variants narrow to primary/secondary. isClearable becomes Select.ClearButton inside the trigger, with an explicit ban on nested button elements and documented Backspace/Delete clearing for keyboard and screen-reader users.
- **Finding lines:** `27-97, 132-184, 504-544` in the reviewed text.

### 140. [migration/skeleton](https://heroui.com/en/docs/react/migration/skeleton)

- **Group / pass:** `migration` / `migration-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/skeleton.mdx` — `pinned-source-mdx`, 6,873 bytes.
- **Full-read lines:** `1-245`; **delivery chunks:** `1-200, 201-245`.
- **Reviewed SHA-256:** `713c37336a7952caa376de887e62ed28b433f91cb31fc35826465bba048b2b0f`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/skeleton.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/skeleton.mdx`; SHA-256 `713c37336a7952caa376de887e62ed28b433f91cb31fc35826465bba048b2b0f`.
- **Saved reader acquisition:** `docs/migration/skeleton.mdx`; 7,490 bytes; SHA-256 `209f1a96760692f13a8d38bedc218cf8a3aabbb120c7523d0f502c5d9f153e2c`.
- **Finding:** v2's isLoaded/children wrapper becomes a standalone v3 placeholder, so the application conditionally renders Skeleton or real content. disableAnimation becomes animationType (shimmer by default, pulse or none), and classNames becomes className. The guide adds a synchronized parent skeleton--shimmer pattern with child animationType=none and a global --skeleton-animation CSS default overridden by an individual animationType prop.
- **Finding lines:** `12-66, 70-97, 209-245` in the reviewed text.

### 141. [migration/slider](https://heroui.com/en/docs/react/migration/slider)

- **Group / pass:** `migration` / `migration-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/slider.mdx` — `pinned-source-mdx`, 6,203 bytes.
- **Full-read lines:** `1-253`; **delivery chunks:** `1-200, 201-253`.
- **Reviewed SHA-256:** `ec8ee02f4c256256dd3f4348425d66216b62114846d95c5648afc49c46250983`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/slider.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/slider.mdx`; SHA-256 `ec8ee02f4c256256dd3f4348425d66216b62114846d95c5648afc49c46250983`.
- **Saved reader acquisition:** `docs/migration/slider.mdx`; 7,986 bytes; SHA-256 `9a526ea515b026da6c6209b08c125229eb09ba540eee3aaef6c6117cbd71a596`.
- **Finding:** v3 Slider moves label/value/track/thumb rendering into Label, Output, Track, Fill and Thumb composition; Label and Output are optional in the anatomy. Range sliders map state.values to indexed thumbs within the Track render prop. Hide flags become component omission, and root render callbacks become component composition/render props. onChangeEnd remains supported and is documented to fire when dragging finishes. The table marks showSteps, showTooltip and fillOffset not yet supported; its marks-prop row also says 'Not yet supported' but explicitly points to Slider.Marks.
- **Finding lines:** `29-80, 118-157, 185-213, 215-253` in the reviewed text.

### 142. [migration/snippet](https://heroui.com/en/docs/react/migration/snippet)

- **Group / pass:** `migration` / `migration-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/snippet.mdx` — `pinned-source-mdx`, 11,970 bytes.
- **Full-read lines:** `1-423`; **delivery chunks:** `1-200, 201-400, 401-423`.
- **Reviewed SHA-256:** `4ee5176eb6f4ffdd45a1ca4e46387b1042441e5e802e6b0f4ec6ff02c1bf15f3`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/snippet.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/snippet.mdx`; SHA-256 `4ee5176eb6f4ffdd45a1ca4e46387b1042441e5e802e6b0f4ec6ff02c1bf15f3`.
- **Saved reader acquisition:** `docs/migration/snippet.mdx`; 12,766 bytes; SHA-256 `88ae87ba83b948cbdbe466102541967e9614436e983c8f3d5e6873531a148eaf`.
- **Finding:** Snippet is removed from @heroui/react in v3; the guide replaces it with native pre/code markup, Tailwind styling and application-owned Clipboard API copying using Button and Tooltip. Multi-line copying joins strings with newlines, and the recommended local Snippet wrapper restores optional symbol, copy, style and callback behavior rather than restoring a library export. Its copy handler catches failures; the page documents secure-context/user-interaction requirements and a textarea/execCommand fallback. The feature table and reusable example prescribe different font-size scales.
- **Finding lines:** `6-30, 107-143, 202-241, 259-304, 378-423` in the reviewed text.
- **Documentation caveat (lines 29-29, 259-263):** The feature table associates sm/md/lg with text-sm/text-base/text-lg, but the recommended reusable component's sizeClasses maps sm to text-xs, md to text-sm and lg to text-base. The suggested scales differ by one step. This is an inconsistency between the migration table and its userland example, not a current library-component defect.

### 143. [migration/spacer](https://heroui.com/en/docs/react/migration/spacer)

- **Group / pass:** `migration` / `migration-05`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/spacer.mdx` — `pinned-source-mdx`, 6,719 bytes.
- **Full-read lines:** `1-284`; **delivery chunks:** `1-200, 201-284`.
- **Reviewed SHA-256:** `59282fde938c5d6fa107435d466fa4c670760a78039ded51f34765c4f41b0f00`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/spacer.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/spacer.mdx`; SHA-256 `59282fde938c5d6fa107435d466fa4c670760a78039ded51f34765c4f41b0f00`.
- **Saved reader acquisition:** `docs/migration/spacer.mdx`; 7,292 bytes; SHA-256 `5be62dbd58623f445de342f6a9ebd7d8a5e0dd4cfbb740faf6e1fefdf723910c`.
- **Finding:** Spacer and its @heroui/react import are removed in v3. The guide maps x/y spacing to margin utilities on actual content, documents the shared Tailwind spacing scale (for example 4 equals 1rem/16px), and recommends parent gap utilities for flex/grid or space-x/space-y for repeated lists. Migration removes dedicated spacer elements instead of recreating the v2 component.
- **Finding lines:** `6-34, 60-79, 101-116, 162-181, 221-250` in the reviewed text.

### 144. [migration/spinner](https://heroui.com/en/docs/react/migration/spinner)

- **Group / pass:** `migration` / `migration-06`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/spinner.mdx` — `pinned-source-mdx`, 4,813 bytes.
- **Full-read lines:** `1-184`; **delivery chunks:** `1-184`.
- **Reviewed SHA-256:** `80d79da968f43929f083725df3cf50496f56a79cb8c67415172aab396e3b2148`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/spinner.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/spinner.mdx`; SHA-256 `80d79da968f43929f083725df3cf50496f56a79cb8c67415172aab396e3b2148`.
- **Saved reader acquisition:** `docs/migration/spinner.mdx`; 5,658 bytes; SHA-256 `7f8f5b9f7fd2024126a13a802b6de1601f86f4db0b7206df0927512a9ea78882`.
- **Finding:** The guide replaces v2's six spinner variants and label/labelColor API with one v3 circular Spinner and separately rendered labels; classNames becomes className. v3 adds size xl, maps default to current and primary to accent, and removes secondary in favor of current/accent while retaining success, warning and danger.
- **Finding lines:** `34-55, 77-89, 164-184` in the reviewed text.

### 145. [migration/styling](https://heroui.com/en/docs/react/migration/styling)

- **Group / pass:** `migration` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/styling.mdx` — `pinned-source-mdx`, 23,385 bytes.
- **Full-read lines:** `1-720`; **delivery chunks:** `1-720`.
- **Reviewed SHA-256:** `cf8143b26851308ec80bef62ce1c873c32ad12a48410c6ea9a2ef8d00f32c14d`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/styling.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/styling.mdx`; SHA-256 `cf8143b26851308ec80bef62ce1c873c32ad12a48410c6ea9a2ef8d00f32c14d`.
- **Saved reader acquisition:** `docs/migration/styling.mdx`; 26,642 bytes; SHA-256 `9e90aca8e5a970f707dc931712e137efb99aa1da50acc67d7da1ab6111cda10e`.
- **Finding:** The styling migration moves configuration/plugin tokens and v2 visual variants into v3 CSS variables, BEM classes, and semantic variants; the Tailwind v4 processing boundary remains material.
- **Finding lines:** `1-720` in the reviewed text.

### 146. [migration/switch](https://heroui.com/en/docs/react/migration/switch)

- **Group / pass:** `migration` / `migration-06`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/switch.mdx` — `pinned-source-mdx`, 9,457 bytes.
- **Full-read lines:** `1-379`; **delivery chunks:** `1-200, 201-379`.
- **Reviewed SHA-256:** `f89c4cd54239b8dc2e158b090ea3431f64476c966378cf9399b751bd99eb6013`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/switch.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/switch.mdx`; SHA-256 `f89c4cd54239b8dc2e158b090ea3431f64476c966378cf9399b751bd99eb6013`.
- **Saved reader acquisition:** `docs/migration/switch.mdx`; 10,082 bytes; SHA-256 `c074974320acece72153aa189b852e1e4dfdadb3b6f42ce164a4cd37a0bb1a09`.
- **Finding:** v2's child-label Switch becomes a v3 Switch.Content > Switch.Control > Switch.Thumb composition, with Switch.Icon and the new SwitchGroup. Description/FieldError are siblings of Switch.Content. onValueChange becomes onChange with the same boolean callback signature; sm/md/lg sizes remain, while color, thumbIcon, startContent/endContent and classNames give way to CSS or explicit parts.
- **Finding lines:** `43-66, 320-368, 372-379` in the reviewed text.
- **Documentation caveat (lines 24-38, 188-200, 372-374):** The summary instructs users to put a Label component inside Switch.Content, but the basic and description v3 examples import Label and render plain text in that position without a Label element. This is an inconsistency between the labeling instructions and examples, not evidence that either pattern fails at runtime.

### 147. [migration/table](https://heroui.com/en/docs/react/migration/table)

- **Group / pass:** `migration` / `migration-06`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/table.mdx` — `pinned-source-mdx`, 16,145 bytes.
- **Full-read lines:** `1-523`; **delivery chunks:** `1-200, 201-400, 401-523`.
- **Reviewed SHA-256:** `6770e7299de8290aacd8f9ec73593bb8000bc5fe2b286602bdaefd9ae57f2a72`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/table.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/table.mdx`; SHA-256 `6770e7299de8290aacd8f9ec73593bb8000bc5fe2b286602bdaefd9ae57f2a72`.
- **Saved reader acquisition:** `docs/migration/table.mdx`; 19,406 bytes; SHA-256 `0946dbf504e21f53e484596776ee96f0a5db9fc8196f55632cc08b66938ced0b`.
- **Finding:** v3 makes Table a styling wrapper and moves aria-label plus selection, sorting and action props to Table.Content, with ScrollContainer and Footer owning scrolling/footer composition. Selection checkboxes become explicit Checkbox slot=selection children; row/column state uses id while React key remains for lists. emptyContent becomes renderEmptyState, loading guidance uses Table.LoadMore for infinite scroll, virtualization moves to React Aria Virtualizer/TableLayout, and resizing adds ResizableContainer/ColumnResizer.
- **Finding lines:** `69-133, 286-325, 424-444, 505-523` in the reviewed text.

### 148. [migration/tabs](https://heroui.com/en/docs/react/migration/tabs)

- **Group / pass:** `migration` / `migration-06`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/tabs.mdx` — `pinned-source-mdx`, 6,279 bytes.
- **Full-read lines:** `1-211`; **delivery chunks:** `1-200, 201-211`.
- **Reviewed SHA-256:** `c54adab5b594df584cd2d55fc3ec1ae9f57aca61f6a13a4ce905caaca41383a7`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/tabs.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/tabs.mdx`; SHA-256 `c54adab5b594df584cd2d55fc3ec1ae9f57aca61f6a13a4ce905caaca41383a7`.
- **Saved reader acquisition:** `docs/migration/tabs.mdx`; 7,203 bytes; SHA-256 `c15ffb0526e4c1680c383a59f7b77cfa421ea00eab5bc9734c6dc982af8a02e4`.
- **Finding:** v2 Tab title/panel children split into v3 Tabs.Tab children and a separate Tabs.Panel with matching ids, inside ListContainer/List structure. selectedKey/onSelectionChange remain on Tabs; isVertical becomes orientation, variants narrow to primary/secondary, and color/size/radius styling props disappear. The cursor becomes an explicitly composed Indicator, and the new Separator goes inside tabs other than the first.
- **Finding lines:** `28-82, 86-125, 157-198, 203-211` in the reviewed text.
- **Documentation caveat (lines 187-198, 201-207):** The anatomy marks Tabs.Indicator optional, whereas the summary says it must explicitly be included in each tab. The assigned text disagrees about the requirement; this does not establish runtime validity when the indicator is omitted.

### 149. [migration/timeinput](https://heroui.com/en/docs/react/migration/timeinput)

- **Group / pass:** `migration` / `migration-06`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/timeinput.mdx` — `pinned-source-mdx`, 8,052 bytes.
- **Full-read lines:** `1-266`; **delivery chunks:** `1-200, 201-266`.
- **Reviewed SHA-256:** `beb29dc5b73cd543d6b46e5b88704963576ab6b7e9e249e56fef0f3c560752eb`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/timeinput.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/timeinput.mdx`; SHA-256 `beb29dc5b73cd543d6b46e5b88704963576ab6b7e9e249e56fef0f3c560752eb`.
- **Saved reader acquisition:** `docs/migration/timeinput.mdx`; 10,823 bytes; SHA-256 `3c576debcfe528c4600f1282062a0be8678aaefec9e2a9d7e8cd2cb381998f9a`.
- **Finding:** TimeInput becomes TimeField composed with DateInputGroup and its Input render prop/Segment children. Labels, descriptions, errors and prefix/suffix content become explicit components; time values, limits, granularity and validation props remain on TimeField. variant moves to DateInputGroup with only primary/secondary, and old styling/DOM prop bundles move to the relevant parts. The controlled v3 example explicitly types state as TimeValue | null.
- **Finding lines:** `22-79, 147-166, 209-237, 257-266` in the reviewed text.

### 150. [migration/toast](https://heroui.com/en/docs/react/migration/toast)

- **Group / pass:** `migration` / `migration-06`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/toast.mdx` — `pinned-source-mdx`, 4,813 bytes.
- **Full-read lines:** `1-220`; **delivery chunks:** `1-200, 201-220`.
- **Reviewed SHA-256:** `22597069dd2a6711cab8c63b3dd7c42d1b820aa988145f4c09badc79fc9981ee`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/toast.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/toast.mdx`; SHA-256 `22597069dd2a6711cab8c63b3dd7c42d1b820aa988145f4c09badc79fc9981ee`.
- **Saved reader acquisition:** `docs/migration/toast.mdx`; 5,068 bytes; SHA-256 `df8cef3c86506f97caa8cb46baeaf74b5977319c89eaf29e11ad1ea1832c508f`.
- **Finding:** As described by this guide, the v2 ToastProvider/useToast()/toast.show() pattern becomes v3 Toast.Provider plus a separately imported global toast() and helper methods. Custom rendering moves from a per-call render option to a provider render prop, and toast.promise supplies loading/success/error messages. Variant prose maps error to danger and info to accent, while a v3 example still calls toast.info(), leaving helper-alias status unspecified.
- **Finding lines:** `12-94, 98-144, 148-220` in the reviewed text.

### 151. [migration/tooltip](https://heroui.com/en/docs/react/migration/tooltip)

- **Group / pass:** `migration` / `migration-06`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/tooltip.mdx` — `pinned-source-mdx`, 9,190 bytes.
- **Full-read lines:** `1-353`; **delivery chunks:** `1-200, 201-353`.
- **Reviewed SHA-256:** `4912da1cdf955596785c0649e9264effbd8697dd2119f109c41522fe5e52090f`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/tooltip.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/tooltip.mdx`; SHA-256 `4912da1cdf955596785c0649e9264effbd8697dd2119f109c41522fe5e52090f`.
- **Saved reader acquisition:** `docs/migration/tooltip.mdx`; 11,219 bytes; SHA-256 `3506263c5125eb07a2197cb6c648e4b779977a681fc69c08a69fc356f4c75616`.
- **Finding:** v2 content becomes Tooltip.Content children with an explicit Tooltip.Trigger; showArrow, placement and offset move to Content, with Tooltip.Arrow also composed explicitly for an arrow. The documented default delay changes from 0 to 700, and examples set delay=0 to preserve v2 timing. onClose is replaced by onOpenChange; many portal/positioning/dismissal controls are no longer exposed. The guide describes isDisabled as new and documents custom render props on Content/Arrow.
- **Finding lines:** `49-85, 110-120, 277-312, 314-339` in the reviewed text.
- **Documentation caveat (lines 64-69, 277-307):** The prop table says trigger 'Still exists', but the section headed 'New Props in v3' includes trigger. Its hover/focus values are consistent; the contradiction is the new-versus-retained classification, not a demonstrated change or defect in either version's runtime API.

### 152. [migration/user](https://heroui.com/en/docs/react/migration/user)

- **Group / pass:** `migration` / `migration-06`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/user.mdx` — `pinned-source-mdx`, 11,252 bytes.
- **Full-read lines:** `1-446`; **delivery chunks:** `1-200, 201-400, 401-446`.
- **Reviewed SHA-256:** `403304f2d3aa8b18432ed8710fb82430414ed284f86de2e9817eb6ad4f7c2527`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/%28components%29/user.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/migration/(components)/user.mdx`; SHA-256 `403304f2d3aa8b18432ed8710fb82430414ed284f86de2e9817eb6ad4f7c2527`.
- **Saved reader acquisition:** `docs/migration/user.mdx`; 11,682 bytes; SHA-256 `705e0011e555a35957ef47b7bda9881e3067aa602246639d63a16eea75742e90`.
- **Finding:** The guide removes the package User component in v3 rather than renaming it. Replace name/description props with text, avatarProps with Avatar.Image/Fallback composition, and isFocusable/classNames with local focus handling and styling. A reusable User is shown only as optional application-owned code; it is not a replacement export from @heroui/react.
- **Finding lines:** `6-27, 50-68, 258-315, 388-405` in the reviewed text.

## releases

### 153. [releases](https://heroui.com/en/docs/react/releases)

- **Group / pass:** `releases` / `releases-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/index.mdx` — `pinned-source-mdx`, 20,498 bytes.
- **Full-read lines:** `1-405`; **delivery chunks:** `1-200, 201-400, 401-405`.
- **Reviewed SHA-256:** `a2395a6c8a76edbc5fe910ba56edb7876176311ce26d8a834cc48739446d597e`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/index.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/index.mdx`; SHA-256 `a2395a6c8a76edbc5fe910ba56edb7876176311ce26d8a834cc48739446d597e`.
- **Saved reader acquisition:** `docs/releases.mdx`; 18,425 bytes; SHA-256 `46be7856a5bd9bc3c0b925d6d3a891b79ba4eaa05143623c8d9e923b1ef74c22`.
- **Finding:** The pinned index identifies v3.2.7 (October 28, 2026) as latest: Sheet, Slider step indicators/mark labels, React Aria Components 1.22.1 (react-aria 3.53.1), and documented overlay, RTL, hydration, scrolling and form fixes. It explicitly records breaking changes outside major releases: v3.0.5 renames Text to Typography, and v3.2.0 requires explicit Radio/Checkbox/Switch Content composition. It also records beta.4's declaration/export build issue as fixed in beta.5.
- **Finding lines:** `12-18, 82-88, 102-108, 241-260` in the reviewed text.
- **Documentation caveat (lines 313-313):** The beta.1 summary says '8 new components' but its parenthesized list names only seven: Alert, Checkbox, InputOTP, ListBox, Select, Slider and Surface. This is an enumeration omission, not evidence that only seven shipped; the assigned detailed beta.1 page includes CheckboxGroup as well (lines 69-77).

### 154. [releases/v3-0-0](https://heroui.com/en/docs/react/releases/v3-0-0)

- **Group / pass:** `releases` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0.mdx` — `pinned-source-mdx`, 21,883 bytes.
- **Full-read lines:** `1-686`; **delivery chunks:** `1-686`.
- **Reviewed SHA-256:** `8c241faf1fb2b92716bd19354f1bf05dda877566c304080178ca7e6d2c512330`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0.mdx`; SHA-256 `8c241faf1fb2b92716bd19354f1bf05dda877566c304080178ca7e6d2c512330`.
- **Saved reader acquisition:** `docs/releases/v3-0-0.mdx`; 40,813 bytes; SHA-256 `e35260c1bc4406be7709ea20ec5764da2cf464d3d6c20378f1e059c226e694db`.
- **Finding:** The 3.0 stable announcement presents the ground-up RAC/compound/CSS-variable rewrite, CSS motion and agent documentation; its Native and Pro sections were read as inline release text, not separate product audits.
- **Finding lines:** `1-686` in the reviewed text.

### 155. [releases/v3-0-0-alpha-32](https://heroui.com/en/docs/react/releases/v3-0-0-alpha-32)

- **Group / pass:** `releases` / `releases-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-alpha-32.mdx` — `pinned-source-mdx`, 5,158 bytes.
- **Full-read lines:** `1-183`; **delivery chunks:** `1-183`.
- **Reviewed SHA-256:** `f9ac460fe0d57c5f62650a175fcb1b62c2ee03123ceeb08c79af3029c3e0d7cb`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-alpha-32.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-alpha-32.mdx`; SHA-256 `f9ac460fe0d57c5f62650a175fcb1b62c2ee03123ceeb08c79af3029c3e0d7cb`.
- **Saved reader acquisition:** `docs/releases/v3-0-0-alpha-32.mdx`; 5,428 bytes; SHA-256 `b98f2e64a38d7d884b29ba01813ca4581db6ad5731ef3f72708c14e82e4b145b`.
- **Finding:** alpha.32 adds the HeroUI MCP server and standalone CloseButton. Its breaking Card redesign replaces surface with variant (flat, outlined, elevated, filled), Card.Image with an img inside Card.Header, Card.Details with Card.Body, and Card.CloseButton with composed CloseButton; the numbered migration maps surface values 1/2/3/4 to flat/outlined/elevated/filled.
- **Finding lines:** `41-43, 84-119, 123-137, 154-172` in the reviewed text.
- **Documentation caveat (lines 93-112, 154-160):** The before/after example changes surface="1" to variant="outlined" (lines 95 and 105), while the numbered migration maps surface="1" to variant="flat" (line 157). The page gives inconsistent replacement guidance for the same old value.

### 156. [releases/v3-0-0-alpha-33](https://heroui.com/en/docs/react/releases/v3-0-0-alpha-33)

- **Group / pass:** `releases` / `releases-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-alpha-33.mdx` — `pinned-source-mdx`, 3,394 bytes.
- **Full-read lines:** `1-112`; **delivery chunks:** `1-112`.
- **Reviewed SHA-256:** `90e6ce6cb13dad98a5052afbf917bfd18dd46c3047ec6d21d7831fd6bf92f944`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-alpha-33.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-alpha-33.mdx`; SHA-256 `90e6ce6cb13dad98a5052afbf917bfd18dd46c3047ec6d21d7831fd6bf92f944`.
- **Saved reader acquisition:** `docs/releases/v3-0-0-alpha-33.mdx`; 4,341 bytes; SHA-256 `2d54e23dbf83cfed03add1e2ce63d2ad1fcc91982dece927822b22a07b700e49`.
- **Finding:** alpha.33 upgrades React Aria Components to its October 2, 2025 release, uses measured --disclosure-panel-width/height variables for Disclosure/DisclosureGroup animations, and adopts SelectionIndicator for Tabs with a documented SSR/initial-layout-shift fix. The breaking Tabs migration moves Tabs.Indicator inside each Tabs.Tab; Switch gains sm/md/lg sizes and revised styles/animations.
- **Finding lines:** `41-79, 94-99` in the reviewed text.

### 157. [releases/v3-0-0-alpha-34](https://heroui.com/en/docs/react/releases/v3-0-0-alpha-34)

- **Group / pass:** `releases` / `releases-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-alpha-34.mdx` — `pinned-source-mdx`, 4,978 bytes.
- **Full-read lines:** `1-166`; **delivery chunks:** `1-166`.
- **Reviewed SHA-256:** `1cb18defdfc8bf10b1d5c2323a8ab7da4f2d99dce4212110d4d91ec336f1308a`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-alpha-34.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-alpha-34.mdx`; SHA-256 `1cb18defdfc8bf10b1d5c2323a8ab7da4f2d99dce4212110d4d91ec336f1308a`.
- **Saved reader acquisition:** `docs/releases/v3-0-0-alpha-34.mdx`; 12,292 bytes; SHA-256 `53f15ca461bec77189c40b0526e8e48d15b44dcb7aa8721a1e03654b12cdff5c`.
- **Finding:** alpha.34 introduces nine React Aria-based form primitives (Description, FieldError, Fieldset, Form, Input, Label, RadioGroup, TextField and TextArea), --field-* styling tokens, and standardized base/label/description/error data-slot markers. Its explicit breaking migration renames Skeleton's --skeleton-default-animation-type token to --skeleton-animation.
- **Finding lines:** `46-48, 104-134, 143-148` in the reviewed text.

### 158. [releases/v3-0-0-alpha-35](https://heroui.com/en/docs/react/releases/v3-0-0-alpha-35)

- **Group / pass:** `releases` / `releases-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-alpha-35.mdx` — `pinned-source-mdx`, 12,472 bytes.
- **Full-read lines:** `1-401`; **delivery chunks:** `1-200, 201-400, 401-401`.
- **Reviewed SHA-256:** `83b5e027467efb14a8246633500207659c4f0723794e31815167adb782b7a139`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-alpha-35.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-alpha-35.mdx`; SHA-256 `83b5e027467efb14a8246633500207659c4f0723794e31815167adb782b7a139`.
- **Saved reader acquisition:** `docs/releases/v3-0-0-alpha-35.mdx`; 13,939 bytes; SHA-256 `32d3cd2effa82934ff3de0558bf9a44f688f7b6facc8ae7d230dd142063ced03`.
- **Finding:** alpha.35 documents an RSC compatibility fix by moving compound-pattern wiring into component index files, adopts React 19 ref-as-prop/direct Context providers, and introduces a breaking .Root requirement for compound roots. Switch.Group and its Switch.GroupItems wrapper become a separately imported SwitchGroup without the inner wrapper; named-export usage is described as remaining supported.
- **Finding lines:** `45-63, 82-108, 164-185` in the reviewed text.
- **Documentation caveat (lines 170-185, 319-334):** The affected-component inventories disagree: the 'All compound components are affected' list includes RadioGroup -> RadioGroup.Root, whereas the 'Complete Migration Reference' lists Radio -> Radio.Root and omits RadioGroup.
- **Documentation caveat (lines 118-133, 346-354):** The automated Switch migration conflicts with its wrapper-removal goal. The prefix replacement on line 349 also changes the opening <Switch.GroupItems> to <SwitchGroupItems>; the later removal on line 353 still searches for the original dotted spelling. On the page's own before-example, that ordering would leave a renamed opening wrapper while removing its closing wrapper. This is static reading of the supplied text, not execution of the script.
- **Documentation caveat (lines 288-296, 340-363):** The automation note says the replacements only affect files using the compound pattern, but the Avatar expressions match the same <Avatar> and </Avatar> tags shown in the supported named-export example. Those expressions do not enforce the page's instruction to leave named-export usage alone.

### 159. [releases/v3-0-0-beta-1](https://heroui.com/en/docs/react/releases/v3-0-0-beta-1)

- **Group / pass:** `releases` / `releases-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-1.mdx` — `pinned-source-mdx`, 25,823 bytes.
- **Full-read lines:** `1-870`; **delivery chunks:** `1-200, 201-400, 401-600, 601-800, 801-870`.
- **Reviewed SHA-256:** `581142d06daed4651c662f3a0ae8374579949cbfde5e2d15bac1a552788c1bd6`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-1.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-1.mdx`; SHA-256 `581142d06daed4651c662f3a0ae8374579949cbfde5e2d15bac1a552788c1bd6`.
- **Saved reader acquisition:** `docs/releases/v3-0-0-beta-1.mdx`; 48,921 bytes; SHA-256 `31734c94e237234cba53680a1202ce1fb47b011ead9408cb7785e4e1093f1098`.
- **Finding:** beta.1 adds Alert, Checkbox, CheckboxGroup, InputOTP, ListBox, Select, Slider and Surface, restores compound syntax with or without .Root, and documents global data-reduce-motion control. Its breaking redesign splits --panel into --surface/--overlay, replaces numeric surface levels with calculated colors, changes default borders from 1px/15% opacity to 0px/transparent, renames Chip type to color and Tabs.ListWrapper to ListContainer (including export/CSS/data-slot names), and replaces namespace prop-type references with documented bracket syntax or named type imports.
- **Finding lines:** `67-77, 168-242, 248-356, 415-438, 462-515` in the reviewed text.

### 160. [releases/v3-0-0-beta-2](https://heroui.com/en/docs/react/releases/v3-0-0-beta-2)

- **Group / pass:** `releases` / `releases-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-2.mdx` — `pinned-source-mdx`, 8,212 bytes.
- **Full-read lines:** `1-307`; **delivery chunks:** `1-200, 201-307`.
- **Reviewed SHA-256:** `885d4a9b240adaaf50db0c02752d7b108342f7564b75f08a1075840ac837bfb2`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-2.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-2.mdx`; SHA-256 `885d4a9b240adaaf50db0c02752d7b108342f7564b75f08a1075840ac837bfb2`.
- **Saved reader acquisition:** `docs/releases/v3-0-0-beta-2.mdx`; 13,446 bytes; SHA-256 `3b529cfb07fc71b414e63d38e636c4d2b5d486e6a919b8cfa346eac2e50814da`.
- **Finding:** beta.2 adds AlertDialog, ComboBox, Dropdown, InputGroup, Modal and NumberField. Breaking migrations rename Select.Content/SelectContent/SelectContentProps to Select.Popover/SelectPopover/SelectPopoverProps and divider CSS variables/utilities to separator. Explicit dark selectors gain precedence, Separator gains SurfaceContext-driven isOnSurface behavior, and documented fixes include stuck mobile hover via @media (hover: hover), loading-spinner visibility and focus-versus-hover styling.
- **Finding lines:** `55-64, 103-118, 163-178, 195-285, 287-294` in the reviewed text.

### 161. [releases/v3-0-0-beta-3](https://heroui.com/en/docs/react/releases/v3-0-0-beta-3)

- **Group / pass:** `releases` / `releases-01`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-3.mdx` — `pinned-source-mdx`, 10,174 bytes.
- **Full-read lines:** `1-285`; **delivery chunks:** `1-200, 201-285`.
- **Reviewed SHA-256:** `916ce673770715b3233d6d29331b82e5c08eb908f9ede7c003f369b59b980ba2`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-3.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-3.mdx`; SHA-256 `916ce673770715b3233d6d29331b82e5c08eb908f9ede7c003f369b59b980ba2`.
- **Saved reader acquisition:** `docs/releases/v3-0-0-beta-3.mdx`; 21,259 bytes; SHA-256 `2638c978df7303589c8a587bf5c81e6fb7bf442e30527eea9c51dc49871ebbf8`.
- **Finding:** beta.3 adds ButtonGroup, DateField, ErrorMessage, ScrollShadow, SearchField, TagGroup and TimeField; introduces fullWidth support and hideSeparator on Tabs/ButtonGroup/Accordion; and upgrades React Aria Components to 1.14.0 with documented accessibility, mobile-number-input and overlay fixes. Breaking changes rename solid to opaque using AlertDialog.Backdrop's backdropVariant and Modal.Backdrop's variant, and remove asChild. The release removes global scrollbar CSS and documents fixes for invalid-on-surface styles, post-close rerenders and overlay cleanup.
- **Finding lines:** `55-66, 111-169, 175-202, 204-216, 218-271` in the reviewed text.

### 162. [releases/v3-0-0-beta-4](https://heroui.com/en/docs/react/releases/v3-0-0-beta-4)

- **Group / pass:** `releases` / `releases-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-4.mdx` — `pinned-source-mdx`, 10,966 bytes.
- **Full-read lines:** `1-328`; **delivery chunks:** `1-200, 201-328`.
- **Reviewed SHA-256:** `9a95d46b635c69908d712106072d85eb6b6271f5a55e54a098e7444c15b7a883`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-4.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-4.mdx`; SHA-256 `9a95d46b635c69908d712106072d85eb6b6271f5a55e54a098e7444c15b7a883`.
- **Saved reader acquisition:** `docs/releases/v3-0-0-beta-4.mdx`; 26,934 bytes; SHA-256 `5a2297caf06f72ac2fdbfe81c96aa583ecae776f4699e0ec782cf005ea6a66c4`.
- **Finding:** Beta.4 introduces Theme Builder, Autocomplete, Breadcrumbs and preview-status Toast; adds secondary Tabs, primary/secondary Input and InputGroup variants, InputGroup.TextArea, outline Button/ButtonGroup variants and AlertDialog sizes. Breaking changes remove Link underline/underlineOffset props in favor of Tailwind classes and remove isInSurface plus automatic surface detection from eleven field components in favor of explicit variant="secondary". Reported fixes include ButtonGroup direct-child context and its declaration re-export; React Aria providers, utilities and collection primitives become direct exports. Crucially, the page warns that beta.4 had a declaration-generation/export-resolution build issue fixed in beta.5 and recommends upgrading both packages to beta.5.
- **Finding lines:** `12-16, 58-79, 93-97, 105-175, 203-263, 273-314` in the reviewed text.

### 163. [releases/v3-0-0-beta-6](https://heroui.com/en/docs/react/releases/v3-0-0-beta-6)

- **Group / pass:** `releases` / `releases-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-6.mdx` — `pinned-source-mdx`, 12,757 bytes.
- **Full-read lines:** `1-373`; **delivery chunks:** `1-200, 201-373`.
- **Reviewed SHA-256:** `395230a5bfe3e8533b1b750b22bd027fa79e8ec7ab46046d5a179d77f6c86fea`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-6.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-6.mdx`; SHA-256 `395230a5bfe3e8533b1b750b22bd027fa79e8ec7ab46046d5a179d77f6c86fea`.
- **Saved reader acquisition:** `docs/releases/v3-0-0-beta-6.mdx`; 20,602 bytes; SHA-256 `11a843b5712c54daf4a8db2493a4205b5c53a05b588f107161e8124f2b5b69c0`.
- **Finding:** Beta.6 adds ColorPicker, ColorArea, ColorSlider, ColorField, ColorSwatch and ColorSwatchPicker on React Aria color primitives with HSL/HSB/RGB and channel editing. Toast gains loading, provider width, adaptive stacking, deferred onClose and improved promise handling; breaking renames are Toast.Container to Toast.Provider and Toast.Action to Toast.ActionButton, with default gap 14 to 12 and a new implicit 4000 ms timeout. Separator gains variants; Chip.Label automatically wraps plain text for compatibility. ComboBox/ListBox-family CSS selectors become hyphenated, but .textarea explicitly stays unchanged. Surface calculations move to base surface references and on-surface variables/utilities require migration. Reported fixes include overlay blur, invalid-field outlines and Safari SVG shifting.
- **Finding lines:** `54-73, 129-179, 181-198, 202-244, 288-358` in the reviewed text.
- **Documentation caveat (lines 4-5, 362-367):** The frontmatter specifies github.pull: 6129, while the Links section names GitHub PR #6201. These are different release-PR references within the same page; the assigned text does not establish which reference is authoritative.

### 164. [releases/v3-0-0-beta-7](https://heroui.com/en/docs/react/releases/v3-0-0-beta-7)

- **Group / pass:** `releases` / `releases-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-7.mdx` — `pinned-source-mdx`, 10,569 bytes.
- **Full-read lines:** `1-324`; **delivery chunks:** `1-200, 201-324`.
- **Reviewed SHA-256:** `b26a12382f9ae2df3980829df9643539f625f8c21621ef22f52ff82a01c1d868`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-7.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-7.mdx`; SHA-256 `b26a12382f9ae2df3980829df9643539f625f8c21621ef22f52ff82a01c1d868`.
- **Saved reader acquisition:** `docs-recovery/releases/v3-0-0-beta-7-retry.mdx`; 25,700 bytes; SHA-256 `29e752ea0e25ab9d21cbc487d9e403281036ee845c25ea8dc51cbecfee561fbd`.
- **Finding:** Beta.7 adds Calendar, RangeCalendar, DatePicker and DateRangePicker using @internationalized/date types, plus Switch.Content. Tabs removes hideSeparator and data-hide-separator: automatic pseudo-element separators become opt-in Tabs.Separator elements with .tabs__separator styling. DateInputGroup and ColorInputGroup stop being direct @heroui/react exports; their parts move under DateField, TimeField and ColorField, while the underlying field CSS classes explicitly remain unchanged. Breadcrumbs.Item now forwards props to its Link. React Aria Components 1.14.0 to 1.15.0 adds render-prop DOM customization; @internationalized/date 3.10.1 to 3.11.0 changes date-field constraint timing from typing to blur.
- **Finding lines:** `56-74, 133-171, 179-185, 187-217, 219-278, 296-311` in the reviewed text.
- **Documentation caveat (lines 12-14, 135-152):** The opening and API Improvements section introduce Switch.Content as new, but the only example is labeled Before even though it already uses Switch.Content. This is an example-label inconsistency, not evidence of a runtime/API failure.

### 165. [releases/v3-0-0-beta-8](https://heroui.com/en/docs/react/releases/v3-0-0-beta-8)

- **Group / pass:** `releases` / `releases-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-8.mdx` — `pinned-source-mdx`, 5,536 bytes.
- **Full-read lines:** `1-174`; **delivery chunks:** `1-174`.
- **Reviewed SHA-256:** `d9a679f1837ad14a3ccd225231587328d43c0e98eb8feb815cc67667ef1fb0c7`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-8.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-beta-8.mdx`; SHA-256 `d9a679f1837ad14a3ccd225231587328d43c0e98eb8feb815cc67667ef1fb0c7`.
- **Saved reader acquisition:** `docs-recovery/releases/v3-0-0-beta-8.mdx`; 26,720 bytes; SHA-256 `9fafc35a144d1d28bdf7bb83929a46f13f9d72f422ce2433589fa2f9f784c3aa`.
- **Finding:** Beta.8 introduces Badge, Pagination and compound Table primitives with sorting, selection, custom cells, async loading, resizing and footer composition. DateField and TimeField gain InputContainer around the segmented input between prefix and suffix. Its explicit breaking change renames .text-field and its full-width modifier to .textfield, text-field.css to textfield.css, and the corresponding @heroui/styles/src/components export path to avoid Tailwind text-* conflicts. Reported fixes add RangeCalendar cell rounding, propagate isRequired to data-required for DatePicker/DateRangePicker asterisks, and scope Autocomplete/Select invalid-trigger styles to root state.
- **Finding lines:** `12-14, 56-80, 104-136, 138-161` in the reviewed text.

### 166. [releases/v3-0-0-rc-1](https://heroui.com/en/docs/react/releases/v3-0-0-rc-1)

- **Group / pass:** `releases` / `releases-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-rc-1.mdx` — `pinned-source-mdx`, 8,101 bytes.
- **Full-read lines:** `1-248`; **delivery chunks:** `1-200, 201-248`.
- **Reviewed SHA-256:** `93ccbeeae07f8af8facac5692cf9d2df800f90f8c88a5886f0200938956e4f58`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-rc-1.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-0-rc-1.mdx`; SHA-256 `93ccbeeae07f8af8facac5692cf9d2df800f90f8c88a5886f0200938956e4f58`.
- **Saved reader acquisition:** `docs/releases/v3-0-0-rc-1.mdx`; 33,224 bytes; SHA-256 `021d8aa0d7a49cbf12937a6240fcafd2f486c27adca3b52a938a2ee018b52b23`.
- **Finding:** RC.1 adds Drawer, ToggleButton, ToggleButtonGroup, Meter, ProgressBar, ProgressCircle and Toolbar. Table/ListBox virtualization uses re-exported Virtualizer, TableLayout and ListLayout. ButtonGroup gains Separator and orientation; its root changes from div to React Aria Group for role=group semantics, and focus rings become inset. Per-component entrypoints such as @heroui/react/button are added, and React Aria Components moves from 1.15.1 to 1.16.0. Reported fixes restrict InputGroup focus styling to the input/textarea, let Avatar fallback inherit custom radii, stop Modal/AlertDialog backdrop clicks propagating through portals, and correct Firefox Table header styling.
- **Finding lines:** `54-66, 174-227, 230-235` in the reviewed text.

### 167. [releases/v3-0-2](https://heroui.com/en/docs/react/releases/v3-0-2)

- **Group / pass:** `releases` / `releases-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-2.mdx` — `pinned-source-mdx`, 3,832 bytes.
- **Full-read lines:** `1-93`; **delivery chunks:** `1-93`.
- **Reviewed SHA-256:** `9f6815385c9aef7e9d58fb4a2e5f1e3b22cc5640e08b80b7fc5f31ed9a1c0c0f`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-2.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-2.mdx`; SHA-256 `9f6815385c9aef7e9d58fb4a2e5f1e3b22cc5640e08b80b7fc5f31ed9a1c0c0f`.
- **Saved reader acquisition:** `docs/releases/v3-0-2.mdx`; 4,054 bytes; SHA-256 `95bad893b94a99d98d95869abb9d205149367be55a44c119eccc136c025f3ef3`.
- **Finding:** 3.0.2 adds --backdrop and bg-backdrop for Modal, AlertDialog and Drawer, replacing hardcoded backdrops with black at 0.5 alpha in light mode and 0.6 in dark mode. Trigger elements across overlays and Disclosure gain inline-block to prevent inline-content layout collapse; Tooltip/Popover arrow curves and small/medium Tag padding change. Reported fixes make Autocomplete popover --trigger-width track resize via useResizeObserver, replace Drawer animate-in/animate-out with native CSS translate transitions, restrict InputGroup secondary focus backgrounds to actual input/textarea focus, and give Tag CloseButton an explicit aria-label="Remove tag".
- **Finding lines:** `47-59, 61-80` in the reviewed text.

### 168. [releases/v3-0-3](https://heroui.com/en/docs/react/releases/v3-0-3)

- **Group / pass:** `releases` / `releases-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-3.mdx` — `pinned-source-mdx`, 4,513 bytes.
- **Full-read lines:** `1-127`; **delivery chunks:** `1-127`.
- **Reviewed SHA-256:** `a58e5b0ca30abe151a0227667c6daf05a23e80f31ab265da2c6754105d3e1097`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-3.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-3.mdx`; SHA-256 `a58e5b0ca30abe151a0227667c6daf05a23e80f31ab265da2c6754105d3e1097`.
- **Saved reader acquisition:** `docs/releases/v3-0-3.mdx`; 7,855 bytes; SHA-256 `f2575fcdac77b59a8d3964ac5c9eba75295e68bc1b7f83654f0d79ece5a45169`.
- **Finding:** 3.0.3 upgrades React Aria Components 1.16.0 to 1.17.0 and reports removal of 90% of RAC's transitive dependencies. It adds expandable Table rows through treeColumn and useTheme for plain React/Vite/CRA: arbitrary theme names or system, localStorage persistence, and resolved data-theme plus class on html. A DOM polymorphic render helper extends lightweight non-React-Aria components, illustrated by Card rendering a button. The release announces Apache License 2.0 replacing MIT and fixes secondary Tabs styles leaking into nested tab groups.
- **Finding lines:** `47-61, 63-99, 101-114` in the reviewed text.

### 169. [releases/v3-0-4](https://heroui.com/en/docs/react/releases/v3-0-4)

- **Group / pass:** `releases` / `releases-02`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-4.mdx` — `pinned-source-mdx`, 4,912 bytes.
- **Full-read lines:** `1-103`; **delivery chunks:** `1-103`.
- **Reviewed SHA-256:** `6185e7c805c408aaa1753050d9b350f33f3b94a2bac2055f64422ef1a31eb8a2`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-4.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-4.mdx`; SHA-256 `6185e7c805c408aaa1753050d9b350f33f3b94a2bac2055f64422ef1a31eb8a2`.
- **Saved reader acquisition:** `docs/releases/v3-0-4.mdx`; 7,143 bytes; SHA-256 `0f129f80be17d71d128276a73e5514f9ef52e0e9d8242b3693924a5d115b0f2f`.
- **Finding:** 3.0.4 adds the Pro-derived Typography compound component with Heading/Paragraph/Code/Prose, semantic element selection and shared text props, plus a localStorage-persisted docs theme selector. Radius values across about 45 component CSS files become min()-capped; Table row focus changes to per-cell inset shadows for continuity with virtualization. Reported fixes propagate Autocomplete isDisabled to Trigger/ClearButton, remove hardcoded Checkbox indicator background and field Description padding, update Tooltip padding/radius tokens, correct swapped Theme Builder accent-foreground values, and improve light-accent soft foreground contrast using --accent-soft-foreground with --accent fallback.
- **Finding lines:** `45-68, 75-90` in the reviewed text.

### 170. [releases/v3-0-5](https://heroui.com/en/docs/react/releases/v3-0-5)

- **Group / pass:** `releases` / `releases-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-5.mdx` — `pinned-source-mdx`, 8,045 bytes.
- **Full-read lines:** `1-197`; **delivery chunks:** `1-197`.
- **Reviewed SHA-256:** `2b0780228354d2dadd1727ecb313696109c8df3094598d37b6a87aafaa73c675`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-5.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-0-5.mdx`; SHA-256 `2b0780228354d2dadd1727ecb313696109c8df3094598d37b6a87aafaa73c675`.
- **Saved reader acquisition:** `docs/releases/v3-0-5.mdx`; 10,242 bytes; SHA-256 `32e43d6057837847736ba7d683a98bf77d8acf4f205a2782f51437a0e88ca1ec`.
- **Finding:** v3.0.5 explicitly introduces a breaking change in a patch: Text and its Heading/Paragraph/Code/Prose subcomponents become Typography, and the text BEM block becomes typography to prevent tailwind-merge from silently dropping variant classes. Derived colors move from theme.css formulas into unprefixed variables.css source tokens, consumed directly by 24 component styles; --color-* aliases preserve user-land Tailwind utilities, and derived-token helpers are consolidated. The release also documents Calendar/RangeCalendar soft-foreground hover and Checkbox/Radio field-border fixes, a new CLI reference, React/react-dom 19.2.3 → 19.2.6, @types/react 19.2.7 → 19.2.14, and docs Next.js 16.1.1 → 16.2.6 updates.
- **Finding lines:** `12-14, 49-85, 91-121, 123-169, 173-184` in the reviewed text.

### 171. [releases/v3-1-0](https://heroui.com/en/docs/react/releases/v3-1-0)

- **Group / pass:** `releases` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-1-0.mdx` — `pinned-source-mdx`, 9,252 bytes.
- **Full-read lines:** `1-169`; **delivery chunks:** `1-169`.
- **Reviewed SHA-256:** `6bc3189860fba6a877448eeb362af34af48a6326d688d4496beb4b24cbf2f6ae`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-1-0.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-1-0.mdx`; SHA-256 `6bc3189860fba6a877448eeb362af34af48a6326d688d4496beb4b24cbf2f6ae`.
- **Saved reader acquisition:** `docs/releases/v3-1-0.mdx`; 13,170 bytes; SHA-256 `0781ecaa0290f9459f0e54ebe979eae07cebab616e692755629261584af8fe08`.
- **Finding:** 3.1.0 introduces dedicated soft foreground tokens, a lower-contrast opt-in vibrant palette, shared subtree-controlled scrollbar styling, and documented SSR/RTL/Toast fixes.
- **Finding lines:** `1-169` in the reviewed text.

### 172. [releases/v3-2-0](https://heroui.com/en/docs/react/releases/v3-2-0)

- **Group / pass:** `releases` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-0.mdx` — `pinned-source-mdx`, 12,548 bytes.
- **Full-read lines:** `1-278`; **delivery chunks:** `1-278`.
- **Reviewed SHA-256:** `ffba5635a4745f157d4898900ae0e6ba60c51ccd67bd4ab3a2f7cfa30333f9f5`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-0.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-0.mdx`; SHA-256 `ffba5635a4745f157d4898900ae0e6ba60c51ccd67bd4ab3a2f7cfa30333f9f5`.
- **Saved reader acquisition:** `docs/releases/v3-2-0.mdx`; 24,163 bytes; SHA-256 `9e093da718139bb0906db2d9b5df65b7624a73981ad53422e2bf179d43dd09fa`.
- **Finding:** 3.2.0 adds calendar views/multiple selection and Autocomplete virtualization while explicitly breaking Radio, Checkbox, and Switch composition through mandatory Content parts; a minor-version label does not imply no API migration.
- **Finding lines:** `1-278` in the reviewed text.

### 173. [releases/v3-2-1](https://heroui.com/en/docs/react/releases/v3-2-1)

- **Group / pass:** `releases` / `releases-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-1.mdx` — `pinned-source-mdx`, 2,426 bytes.
- **Full-read lines:** `1-60`; **delivery chunks:** `1-60`.
- **Reviewed SHA-256:** `3709d6c6f265d70bdddc4ce76782d3f646a830d297e562556d92911077c21f56`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-1.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-1.mdx`; SHA-256 `3709d6c6f265d70bdddc4ce76782d3f646a830d297e562556d92911077c21f56`.
- **Saved reader acquisition:** `docs/releases/v3-2-1.mdx`; 2,647 bytes; SHA-256 `eed47f0b9da8cbe71d3df1df6e0dcf097abfc53ebdf61d2507764e046f2c8965`.
- **Finding:** v3.2.1 externalizes react-aria subpaths in the Rollup build alongside the existing @react-* and react-aria-components externals. The documented result is resolution to the project's installed react-aria rather than a vendored duplicate, addressing duplicate-instance bugs and bundle bloat. SwitchGroup also gains the missing switch-group__items wrapper so orientation="horizontal" lays out a row instead of a vertical stack.
- **Finding lines:** `12-12, 45-48` in the reviewed text.

### 174. [releases/v3-2-2](https://heroui.com/en/docs/react/releases/v3-2-2)

- **Group / pass:** `releases` / `releases-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-2.mdx` — `pinned-source-mdx`, 4,101 bytes.
- **Full-read lines:** `1-87`; **delivery chunks:** `1-87`.
- **Reviewed SHA-256:** `e27a44786f789e7b765a92765ea3ea4dafa55081e5faad4a05ed5724cc41e0db`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-2.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-2.mdx`; SHA-256 `e27a44786f789e7b765a92765ea3ea4dafa55081e5faad4a05ed5724cc41e0db`.
- **Saved reader acquisition:** `docs-recovery/releases/v3-2-2.mdx`; 4,267 bytes; SHA-256 `edb756e632430e95f44a47ebc94eaac8ed97afccc18ad9576baeadd399b07edf`.
- **Finding:** v3.2.2 adds Tabs.ListContainer around Tabs.List for overflow chevrons and fading edges in both orientations. Clear/close controls explicitly become type="button" to prevent unintended form submission; other documented fixes address hidden-input overflow, transform-related icon/text shifts, Chip and date-popover width, virtualized Autocomplete padding, and superseded Toast ViewTransition ready rejections. A React 19 refactor adopts use(), ref-as-prop, and stable keys. react-aria-components becomes 1.19.0 and react-aria becomes 3.50.0, with ^1.19.0/^3.50.0 ranges intended to deduplicate with HeroUI Pro.
- **Finding lines:** `47-56, 58-75` in the reviewed text.

### 175. [releases/v3-2-3](https://heroui.com/en/docs/react/releases/v3-2-3)

- **Group / pass:** `releases` / `releases-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-3.mdx` — `pinned-source-mdx`, 4,080 bytes.
- **Full-read lines:** `1-85`; **delivery chunks:** `1-85`.
- **Reviewed SHA-256:** `701216637fa20af7e971bceab26babce1c4f6b88f056fb8e18d9256e50317d0e`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-3.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-3.mdx`; SHA-256 `701216637fa20af7e971bceab26babce1c4f6b88f056fb8e18d9256e50317d0e`.
- **Saved reader acquisition:** `docs-recovery/releases/v3-2-3.mdx`; 4,231 bytes; SHA-256 `0a65de33bd089106c726b5c313cbbe78579399e7a1858056fdd8d51fd6131f0b`.
- **Finding:** v3.2.3 adds ComboBox multiple selection: set selectionMode="multiple" on both ComboBox and its inner ListBox, render selections through ComboBox.Value, and use value/defaultValue as Key[] with onChange. It adopts logical CSS properties for RTL, tolerates fractional ScrollShadow positions, restores accent Button focus gaps, moves Spinner's accessible name to its status root, and fixes InputOTP width, Table sort-icon alignment, and React Aria collection-builder compatibility; decorative aria-hidden icons lose unused aria-labels. tailwind-variants becomes 3.3.0; react-aria, react-aria-components, and @react-aria/* utilities move to peerDependencies; the release requires Node.js >= 22.x.
- **Finding lines:** `47-56, 58-73` in the reviewed text.

### 176. [releases/v3-2-4](https://heroui.com/en/docs/react/releases/v3-2-4)

- **Group / pass:** `releases` / `releases-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-4.mdx` — `pinned-source-mdx`, 5,323 bytes.
- **Full-read lines:** `1-77`; **delivery chunks:** `1-77`.
- **Reviewed SHA-256:** `35496ead97bf66a23cde707b91c58a0fd9196d0133eefb08f1b4f2200af8eea9`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-4.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-4.mdx`; SHA-256 `35496ead97bf66a23cde707b91c58a0fd9196d0133eefb08f1b4f2200af8eea9`.
- **Saved reader acquisition:** `docs-recovery/releases/v3-2-4.mdx`; 5,544 bytes; SHA-256 `54837714f3623c77ccca7fa396b3c9b152386e524183d4518fa7bb94cb0e36b7`.
- **Finding:** v3.2.4 upgrades tailwind-variants to 3.3.1 to fix variant-class fallback after rerenders, explicitly including controlled Checkbox and secondary Tabs. It documents shrinkable Autocomplete popovers, backdrop-owned outside Modal scrolling, retained Tooltip animations with shouldSkipAnimation opting into instant swaps, clamped Tabs.ListContainer chevrons, Badge background clipping, a link data-slot, and reachable style export conditions. A new @heroui/testing harness supports react-jsdom behavior/client-SSR and react-browser Playwright projects; QA runs both, but coverage floors apply only to jsdom. Dependencies advance to react-aria-components 1.20.0, react-aria 3.51.0, @react-types/shared 3.36.1, and @internationalized/date 3.12.3.
- **Finding lines:** `45-65` in the reviewed text.

### 177. [releases/v3-2-5](https://heroui.com/en/docs/react/releases/v3-2-5)

- **Group / pass:** `releases` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-5.mdx` — `pinned-source-mdx`, 9,963 bytes.
- **Full-read lines:** `1-109`; **delivery chunks:** `1-109`.
- **Reviewed SHA-256:** `73a5ac7dc9ca005e0f2ab6f857bc2484ce2965bd8d4d3b585c20a0a662830ff4`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-5.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-5.mdx`; SHA-256 `73a5ac7dc9ca005e0f2ab6f857bc2484ce2965bd8d4d3b585c20a0a662830ff4`.
- **Saved reader acquisition:** `docs-recovery/releases/v3-2-5.mdx`; 10,184 bytes; SHA-256 `64876ee457aa3e6ea88fd154c148605250fd9d9c5ed5ad187bacfa96baee5b8e`.
- **Finding:** 3.2.5 adds Toast stacking/update behavior, pointer-only Select clearing with a keyboard path, Tabs alignment, and RAC re-exports intended to preserve shared contexts; theme and nested-label fixes are release-scoped claims.
- **Finding lines:** `1-109` in the reviewed text.

### 178. [releases/v3-2-6](https://heroui.com/en/docs/react/releases/v3-2-6)

- **Group / pass:** `releases` / `releases-03`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-6.mdx` — `pinned-source-mdx`, 9,384 bytes.
- **Full-read lines:** `1-99`; **delivery chunks:** `1-99`.
- **Reviewed SHA-256:** `646b3d540d9954a8f7df4bf95eb9f698bf06904c5f8eea59e6a6d66987617924`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-6.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-6.mdx`; SHA-256 `646b3d540d9954a8f7df4bf95eb9f698bf06904c5f8eea59e6a6d66987617924`.
- **Saved reader acquisition:** `docs-recovery/releases/v3-2-6.mdx`; 9,605 bytes; SHA-256 `01e81957a671edc487743d8c2c9be167ab7b1dfcb521b5b425fb11d01e23a1eb`.
- **Finding:** v3.2.6 restores dedicated AvatarGroup with max, isGrid, clip/ring overlap, and direct-child size/color/variant inheritance. Explicit AvatarGroup.Count replaces v2's total prop and escapes max truncation; meaningful groups need an explicit role and label. The page attributes mouse-triggered focus rings to v3.2.5 and documents a fix using React Aria data-focus-visible on managed surfaces with a scoped native fallback. It requires @internationalized/date@^3.12.4 as a peer, react-aria-components@^1.21.1, and react-aria@^3.52.1; direct tailwind-merge and @react-aria/i18n declarations are removed. Further changes gate ColorSlider production warnings, restore base Tag padding and Breadcrumbs spacing, correct export conditions and Calendar year-picker updates, memoize 43 component contexts plus refs/defaults, remove unused CSS, and rename fieldset__field_group to fieldset__field-group, requiring override updates. Runtime avatar/OTP dependencies are bumped and build-tool security dependencies patched. Styles subpath exports are committed, and selective imports require the shared utilities/variants prelude.
- **Finding lines:** `41-43, 51-55, 57-70, 72-87` in the reviewed text.

### 179. [releases/v3-2-7](https://heroui.com/en/docs/react/releases/v3-2-7)

- **Group / pass:** `releases` / `prior-41`; `full-document-text`.
- **Reviewed text:** `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-7.mdx` — `pinned-source-mdx`, 13,076 bytes.
- **Full-read lines:** `1-114`; **delivery chunks:** `1-114`.
- **Reviewed SHA-256:** `d92dbbc59724ceed2ce62b70afd7262a0a16cbf172a971641622afa708302a29`.
- **Pinned MDX:** [immutable source](https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-7.mdx); `source/heroui-v3/heroui-b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/content/docs/en/react/releases/v3-2-7.mdx`; SHA-256 `d92dbbc59724ceed2ce62b70afd7262a0a16cbf172a971641622afa708302a29`.
- **Saved reader acquisition:** `docs-recovery/releases/v3-2-7.mdx`; 13,297 bytes; SHA-256 `b8faac05a75aca0553cf7a4a1f12e70f21e50356a3eb6edd45ce88eea4d175b7`.
- **Finding:** 3.2.7 moves to RAC 1.22.1, introduces Sheet and Slider steps/marks, and records fixes for dialog naming, CloseButton labels, overlay motion, autofill, and render overhead; the saved runtime covers only its existing bounded specimen.
- **Finding lines:** `1-114` in the reviewed text.

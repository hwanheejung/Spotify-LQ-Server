# Spotify-LT-Server

A Spotify lyrics translation and real-time synchronization tool built with Node.js

```
server
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  ├─ chore
│  │     │  │  └─ 1
│  │     │  ├─ feature
│  │     │  │  ├─ 3
│  │     │  │  ├─ 5
│  │     │  │  └─ 7
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ HEAD
│  │           ├─ chore
│  │           │  └─ 1
│  │           ├─ develop
│  │           └─ feature
│  │              ├─ 3
│  │              ├─ 5
│  │              └─ 7
│  ├─ objects
│  │  ├─ 00
│  │  │  ├─ 35c9ee30b4a55a3515c5f0d469c64a2905b630
│  │  │  └─ 53f473329857e7284fbc9fe67e5a7ff15f1e65
│  │  ├─ 0a
│  │  │  ├─ 5dee7b04568ea3a5cdb68d16458d100c7acb6d
│  │  │  └─ 84edec9750033ec2a0687163d95cab05635642
│  │  ├─ 0f
│  │  │  └─ 7cecfb55e96ceb9ae0a24f299ef897abe6e1a6
│  │  ├─ 10
│  │  │  └─ 23b33ddb8bbe6db821e6042e3ac309ffa3080e
│  │  ├─ 11
│  │  │  └─ a04c8e7992e8590da7724c007d7e33aa9eb91d
│  │  ├─ 12
│  │  │  └─ d55b4ce798a6c4352907eb9ca014aea83791b7
│  │  ├─ 13
│  │  │  └─ 5f1df448f1e17128f98112edf2f21508d7f0ea
│  │  ├─ 15
│  │  │  └─ 539fa0bf6e20e0c6078003f302fe4fa1399582
│  │  ├─ 18
│  │  │  ├─ 6b5f305a91bdabc0e34a5a8ec893c2153315b0
│  │  │  └─ e23a4999921fe6c202721f252e077a51c726ba
│  │  ├─ 1a
│  │  │  └─ 35912069fac7eadc75bb12d5bc4fef2fe10641
│  │  ├─ 1c
│  │  │  └─ f08673676bfd3abc7d8926d91cb7cce50daf3c
│  │  ├─ 27
│  │  │  └─ 0b83cec332ae900043667ca4bebf31dbd93799
│  │  ├─ 37
│  │  │  ├─ 29c70a4d49ea10eabb17f145967ac648f1d674
│  │  │  └─ a66a3861d00c1194543a8fccc89818439aed08
│  │  ├─ 38
│  │  │  └─ 695571a5945cfd18341e3b29cf0ed2ee88cdb4
│  │  ├─ 3a
│  │  │  └─ 6e4a490d28c7f0aa98e833976de8d6ecefd026
│  │  ├─ 3b
│  │  │  └─ 09fac26096429b4b368b162e7e95ba22ea393a
│  │  ├─ 41
│  │  │  └─ ff8d18582a39c5d89d8457a339b2d0eb7da1dc
│  │  ├─ 42
│  │  │  └─ 1e5ff3a51c88aa06e9c34b783eb321750b4cff
│  │  ├─ 45
│  │  │  └─ 4ec4bfa679dbaaf71926414d310961fa4f5ec6
│  │  ├─ 47
│  │  │  ├─ 60e27d6a21be0908eaed5ec67781aed0689b72
│  │  │  └─ 72b2a59d89147c34d88ec616a6a1e4a82e1b0b
│  │  ├─ 49
│  │  │  └─ 1f590afbbb9598fcab866f9e34f29c9794e7a0
│  │  ├─ 4d
│  │  │  ├─ 65cec0b012debd3cc0dc8e92866930ee44b530
│  │  │  └─ ba57fc00c232e3e52ee5a20a13b0c828d18319
│  │  ├─ 54
│  │  │  └─ 5334ab99f82a9aa807bba700d5349051e1e583
│  │  ├─ 55
│  │  │  └─ 83a18baa702e2fc7e3baf3031e3b83b3f1a087
│  │  ├─ 5a
│  │  │  └─ e7b9a9eaf370675ef3813e3e88c60cc69c0508
│  │  ├─ 5b
│  │  │  └─ 0ab986a89be23bbe15324166538cb10ce0259f
│  │  ├─ 62
│  │  │  └─ 95e60f0ef657fd34521bb5b3e54788b619c8e4
│  │  ├─ 63
│  │  │  ├─ 4ca60562435a07d414d1bffcccb21a359bc862
│  │  │  └─ f6b97340ae4011640d0b6d2dd2892a7f792a52
│  │  ├─ 67
│  │  │  └─ ea3dc07d7b4c16e41cc52fd232f72dfc20eace
│  │  ├─ 6a
│  │  │  └─ 616c9834547895effa6c2a2316dbab341c51ac
│  │  ├─ 6c
│  │  │  └─ f14331f6cba101747bd06c2b3169b050882c82
│  │  ├─ 71
│  │  │  ├─ 0d87744e19f69dd6dec9c933e8d0f6ebaa4144
│  │  │  └─ a358f285ec66558177015f11597e04ddc0ef8d
│  │  ├─ 75
│  │  │  └─ 144d2b843f11fe7233f0966db724f7e14d9d4e
│  │  ├─ 76
│  │  │  └─ 6de17461ec544fb99ae771e424e216008e2562
│  │  ├─ 78
│  │  │  ├─ 10e94a89286d9d8f447f1ba0af2aeaaa785891
│  │  │  └─ 5b957b1e6adaf0b59c5192f363c5bc8158a156
│  │  ├─ 7b
│  │  │  └─ ea65c925e12c7c9de39bcf4994a46225f3e94d
│  │  ├─ 7f
│  │  │  ├─ 2218acbedd57dbc7fb268d62fa22014385dbea
│  │  │  └─ 8889865f2787e1127b70062ea048db629b0fef
│  │  ├─ 82
│  │  │  └─ 4be0301175c740b1d6b3d804a581b36cea2b9a
│  │  ├─ 83
│  │  │  └─ 4d7dfe9a21df7d4cf16830aba583c5b476d4fb
│  │  ├─ 84
│  │  │  └─ 860e506bd7490aaeab25e343961c5f2f261eb0
│  │  ├─ 88
│  │  │  ├─ 19b7027ba511d72d051720daeff3703e338bda
│  │  │  └─ 49d9c5b2954f9b19ee99625ffece7ee7fd0fe6
│  │  ├─ 8c
│  │  │  └─ 4eac51b24fb386553553cdc2529104a5d4c91c
│  │  ├─ 95
│  │  │  └─ d1cd2dd0a5380aa04109e3fc008b8e5f372608
│  │  ├─ 97
│  │  │  └─ 59ff2d3489576f9c8b9557bbdbe4e758a066ab
│  │  ├─ 9e
│  │  │  └─ b627ac370a961db37301a2d0d12f0c22aa7f7c
│  │  ├─ 9f
│  │  │  └─ 7d337683e225bc3dcdc037149989ddbf1d8e4e
│  │  ├─ a1
│  │  │  └─ 07ea0529823a007191e7ddb3143358ddb3d636
│  │  ├─ a4
│  │  │  └─ b989292221cfc418ac10a81841a76c239d9c8d
│  │  ├─ a5
│  │  │  ├─ 5550183d9e6db40435409541a2160c498a15e2
│  │  │  └─ d88b024afb97fe17a6917d01fd67a0465fefeb
│  │  ├─ a9
│  │  │  └─ 731ed5b53d3115910d2960f1ba35989430d2cf
│  │  ├─ aa
│  │  │  ├─ 04ccc903ae33ee21795f243d1276608fc18bb3
│  │  │  └─ 2f0bc7da61d91ce92481e85c77058a58e1f1e2
│  │  ├─ ad
│  │  │  └─ 1fec5a4fcea1bfd8296a9bbb512b7d5034e4e7
│  │  ├─ ae
│  │  │  └─ ae3a9ab2e9d0918cbcda53b8030d44a9cd5593
│  │  ├─ b7
│  │  │  └─ 35108865e89916ed156e61ce05f0150b272973
│  │  ├─ bf
│  │  │  └─ 43cddb496b70e8cfa36f0eba28106103c3896b
│  │  ├─ c3
│  │  │  ├─ 3cda4de097e831bf6aa6f5383bb36592e52d4c
│  │  │  └─ 6db27e9e745da677b4a27e044f99a0a70b8936
│  │  ├─ c4
│  │  │  └─ 2cc353830d9f40df63553329aca86d6de68f56
│  │  ├─ c6
│  │  │  └─ b0910cc9dce8afbb29ab21e5de6b83228d1297
│  │  ├─ c7
│  │  │  └─ 60225c57cee65e335df9e8b5f76f61d17a75e6
│  │  ├─ d4
│  │  │  └─ f47a19a553e93ab5ff45d5eb84713f7d4bfd39
│  │  ├─ d6
│  │  │  └─ 727f82dc4b8768c810691a75d64e75a101e2b3
│  │  ├─ d8
│  │  │  └─ 05b736f2695b2e50039b1fdf9e6c87a3e07447
│  │  ├─ e1
│  │  │  └─ 59600f76aa1a32d1433b0b3646aba602d27bbc
│  │  ├─ e3
│  │  │  └─ e6560d0140dad9ff3142b847efc61056219915
│  │  ├─ e7
│  │  │  └─ 1725703e0361eeeff58dc0f765dfdbdb1e8c69
│  │  ├─ e9
│  │  │  ├─ 0b68e78be58d0884aa2a9d7dae71acbff816ac
│  │  │  └─ 44cea9016269174cf609dfe204b339398ded50
│  │  ├─ ec
│  │  │  └─ 71af6a3ac995f3736a0e13d319064644c491d0
│  │  ├─ f3
│  │  │  └─ 1c2960ed30f4b1946f592e684d7d83b3e7b108
│  │  ├─ f5
│  │  │  └─ bd6f817cdc0c1b43202c6ffa9247dfeb349fa4
│  │  ├─ f6
│  │  │  ├─ 92161af91a0594de3147ee3dc0933e7e7f04ba
│  │  │  └─ cfdf9e08dee304d1728e5bb5d934b52e82dfb3
│  │  ├─ f9
│  │  │  └─ 6ccd39aa21d6c40ac8461f90f9d4109c871717
│  │  ├─ fb
│  │  │  └─ d1807685f1f9373f2b750cc80635527e1c587d
│  │  ├─ fc
│  │  │  └─ b66d5e1bf442b6a703b8af0e9cb7c6a23e841f
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-7b31878aca09e87a84de09bdd7fa17a61bf1a446.idx
│  │     ├─ pack-7b31878aca09e87a84de09bdd7fa17a61bf1a446.pack
│  │     └─ pack-7b31878aca09e87a84de09bdd7fa17a61bf1a446.rev
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  ├─ chore
│     │  │  └─ 1
│     │  ├─ feature
│     │  │  ├─ 3
│     │  │  ├─ 5
│     │  │  └─ 7
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     ├─ HEAD
│     │     ├─ chore
│     │     │  └─ 1
│     │     ├─ develop
│     │     └─ feature
│     │        ├─ 3
│     │        ├─ 5
│     │        └─ 7
│     └─ tags
├─ .github
│  ├─ issue_template.md
│  └─ pull_request_template.md
├─ .gitignore
├─ README.md
├─ dist
│  └─ src
│     ├─ config
│     │  └─ db.js
│     ├─ controllers
│     │  └─ authController.js
│     ├─ db.js
│     ├─ init.js
│     ├─ models
│     │  └─ User.js
│     ├─ routers
│     │  └─ authRouter.js
│     ├─ server.js
│     ├─ services
│     │  ├─ spotifyService.js
│     │  └─ tokenService.js
│     └─ utils
│        └─ jwtUtil.js
├─ package-lock.json
├─ package.json
├─ src
│  ├─ config
│  │  └─ db.ts
│  ├─ controllers
│  │  └─ authController.ts
│  ├─ graphql
│  │  ├─ context.ts
│  │  ├─ index.ts
│  │  ├─ resolvers
│  │  │  ├─ index.ts
│  │  │  └─ userResolver.ts
│  │  └─ schema
│  │     ├─ index.ts
│  │     └─ userSchema.ts
│  ├─ init.ts
│  ├─ models
│  │  └─ User.ts
│  ├─ routers
│  │  └─ authRouter.ts
│  ├─ server.ts
│  ├─ services
│  │  ├─ spotifyService.ts
│  │  └─ tokenService.ts
│  ├─ types
│  │  └─ env.d.ts
│  └─ utils
│     └─ jwtUtil.ts
└─ tsconfig.json

```
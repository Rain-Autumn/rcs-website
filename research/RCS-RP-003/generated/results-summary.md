# Calculated results (generated from results.csv)

ZIP changes use logical input bytes; NTFS changes use pre-compression allocated bytes.

## Corpus aggregate cases

| Dataset | Method | Files | Logical bytes | Reference bytes | Output median | Change median | Ratio | Runs | Integrity |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| Canterbury | NTFS compact | 11 | 2810784 | 2810784 | 1412745 | -49.7384% | 1.9896 | 3 | True |
| Canterbury | ZIP Optimal | 11 | 2810784 | 2810784 | 731938 | -73.9596% | 3.8402 | 3 | True |
| Canterbury-Large | NTFS compact | 3 | 11159482 | 11159482 | 6979584 | -37.4560% | 1.5989 | 3 | True |
| Canterbury-Large | ZIP Optimal | 3 | 11159482 | 11159482 | 3259131 | -70.7950% | 3.4241 | 3 | True |
| Silesia | NTFS compact | 12 | 211938580 | 211938580 | 121049088 | -42.8848% | 1.7508 | 1 | True |
| Silesia | ZIP Optimal | 12 | 211938580 | 211938580 | 68221469 | -67.8107% | 3.1066 | 1 | True |

## Synthetic cases

| Case | Method | Logical bytes | Reference bytes | Output median | Change median | Ratio | Runs | Integrity |
|---|---|---:|---:|---:|---:|---:|---:|---|
| already-compressed-zip | NTFS compact | 8391324 | 8391324 | 8391324 | 0.0000% | 1.0000 | 5 | True |
| already-compressed-zip | ZIP Optimal | 8391324 | 8391324 | 8394034 | 0.0323% | 0.9997 | 5 | True |
| deterministic-binary-8MiB | NTFS compact | 8388608 | 8388608 | 8388608 | 0.0000% | 1.0000 | 5 | True |
| deterministic-binary-8MiB | ZIP Optimal | 8388608 | 8388608 | 8391324 | 0.0324% | 0.9997 | 5 | True |
| repetitive-log-8MiB | NTFS compact | 8388608 | 8388608 | 1048576 | -87.5000% | 8.0000 | 5 | True |
| repetitive-log-8MiB | ZIP Optimal | 8388608 | 8388608 | 28714 | -99.6577% | 292.1435 | 5 | True |
| small-files-1000 | NTFS compact | 96000 | 96000 | 96000 | 0.0000% | 1.0000 | 5 | True |
| small-files-1000 | ZIP Optimal | 96000 | 96000 | 161997 | 68.7469% | 0.5926 | 5 | True |
| structured-jsonl | NTFS compact | 8388608 | 8388608 | 1048576 | -87.5000% | 8.0000 | 5 | True |
| structured-jsonl | ZIP Optimal | 8388608 | 8388608 | 184883 | -97.7960% | 45.3725 | 5 | True |

## Public corpus files

| Dataset | File | Method | Logical bytes | Reference bytes | Output median | Change median | Ratio | Runs | Integrity |
|---|---|---|---:|---:|---:|---:|---:|---:|---|
| Canterbury | alice29.txt | NTFS compact | 152089 | 152089 | 106496 | -29.9778% | 1.4281 | 3 | True |
| Canterbury | alice29.txt | ZIP Optimal | 152089 | 152089 | 54518 | -64.1539% | 2.7897 | 3 | True |
| Canterbury | asyoulik.txt | NTFS compact | 125179 | 125179 | 86016 | -31.2856% | 1.4553 | 3 | True |
| Canterbury | asyoulik.txt | ZIP Optimal | 125179 | 125179 | 49013 | -60.8457% | 2.5540 | 3 | True |
| Canterbury | cp.html | NTFS compact | 24603 | 24603 | 16384 | -33.4065% | 1.5016 | 3 | True |
| Canterbury | cp.html | ZIP Optimal | 24603 | 24603 | 8067 | -67.2113% | 3.0498 | 3 | True |
| Canterbury | fields.c | NTFS compact | 11150 | 11150 | 8192 | -26.5291% | 1.3611 | 3 | True |
| Canterbury | fields.c | ZIP Optimal | 11150 | 11150 | 3230 | -71.0314% | 3.4520 | 3 | True |
| Canterbury | grammar.lsp | NTFS compact | 3721 | 3721 | 3721 | 0.0000% | 1.0000 | 3 | True |
| Canterbury | grammar.lsp | ZIP Optimal | 3721 | 3721 | 1336 | -64.0957% | 2.7852 | 3 | True |
| Canterbury | kennedy.xls | NTFS compact | 1029744 | 1029744 | 385024 | -62.6097% | 2.6745 | 3 | True |
| Canterbury | kennedy.xls | ZIP Optimal | 1029744 | 1029744 | 204106 | -80.1790% | 5.0451 | 3 | True |
| Canterbury | lcet10.txt | NTFS compact | 426754 | 426754 | 290816 | -31.8539% | 1.4674 | 3 | True |
| Canterbury | lcet10.txt | ZIP Optimal | 426754 | 426754 | 145016 | -66.0188% | 2.9428 | 3 | True |
| Canterbury | plrabn12.txt | NTFS compact | 481861 | 481861 | 364544 | -24.3466% | 1.3218 | 3 | True |
| Canterbury | plrabn12.txt | ZIP Optimal | 481861 | 481861 | 195377 | -59.4537% | 2.4663 | 3 | True |
| Canterbury | ptt5 | NTFS compact | 513216 | 513216 | 122880 | -76.0569% | 4.1766 | 3 | True |
| Canterbury | ptt5 | ZIP Optimal | 513216 | 513216 | 56565 | -88.9783% | 9.0730 | 3 | True |
| Canterbury | sum | NTFS compact | 38240 | 38240 | 24576 | -35.7322% | 1.5560 | 3 | True |
| Canterbury | sum | ZIP Optimal | 38240 | 38240 | 13088 | -65.7741% | 2.9218 | 3 | True |
| Canterbury | xargs.1 | NTFS compact | 4227 | 4227 | 4096 | -3.0991% | 1.0320 | 3 | True |
| Canterbury | xargs.1 | ZIP Optimal | 4227 | 4227 | 1842 | -56.4230% | 2.2948 | 3 | True |
| Canterbury-Large | E.coli | NTFS compact | 4638690 | 4638690 | 2899968 | -37.4830% | 1.5996 | 3 | True |
| Canterbury-Large | E.coli | ZIP Optimal | 4638690 | 4638690 | 1342094 | -71.0674% | 3.4563 | 3 | True |
| Canterbury-Large | bible.txt | NTFS compact | 4047392 | 4047392 | 2400256 | -40.6962% | 1.6862 | 3 | True |
| Canterbury-Large | bible.txt | ZIP Optimal | 4047392 | 4047392 | 1191995 | -70.5491% | 3.3955 | 3 | True |
| Canterbury-Large | world192.txt | NTFS compact | 2473400 | 2473400 | 1679360 | -32.1032% | 1.4728 | 3 | True |
| Canterbury-Large | world192.txt | ZIP Optimal | 2473400 | 2473400 | 725086 | -70.6846% | 3.4112 | 3 | True |
| Silesia | dickens | NTFS compact | 10192446 | 10192446 | 7147520 | -29.8743% | 1.4260 | 3 | True |
| Silesia | dickens | ZIP Optimal | 10192446 | 10192446 | 3871740 | -62.0136% | 2.6325 | 3 | True |
| Silesia | mozilla | NTFS compact | 51220480 | 51220480 | 28700672 | -43.9664% | 1.7846 | 3 | True |
| Silesia | mozilla | ZIP Optimal | 51220480 | 51220480 | 19089230 | -62.7313% | 2.6832 | 3 | True |
| Silesia | mr | NTFS compact | 9970564 | 9970564 | 5951488 | -40.3094% | 1.6753 | 3 | True |
| Silesia | mr | ZIP Optimal | 9970564 | 9970564 | 3676037 | -63.1311% | 2.7123 | 3 | True |
| Silesia | nci | NTFS compact | 33553445 | 33553445 | 10440704 | -68.8834% | 3.2137 | 3 | True |
| Silesia | nci | ZIP Optimal | 33553445 | 33553445 | 3200286 | -90.4621% | 10.4845 | 3 | True |
| Silesia | ooffice | NTFS compact | 6152192 | 6152192 | 4542464 | -26.1651% | 1.3544 | 3 | True |
| Silesia | ooffice | ZIP Optimal | 6152192 | 6152192 | 3097400 | -49.6537% | 1.9862 | 3 | True |
| Silesia | osdb | NTFS compact | 10085684 | 10085684 | 9031680 | -10.4505% | 1.1167 | 3 | True |
| Silesia | osdb | ZIP Optimal | 10085684 | 10085684 | 3695270 | -63.3612% | 2.7294 | 3 | True |
| Silesia | reymont | NTFS compact | 6627202 | 6627202 | 3735552 | -43.6330% | 1.7741 | 3 | True |
| Silesia | reymont | ZIP Optimal | 6627202 | 6627202 | 1860977 | -71.9191% | 3.5611 | 3 | True |
| Silesia | samba | NTFS compact | 21606400 | 21606400 | 10424320 | -51.7536% | 2.0727 | 3 | True |
| Silesia | samba | ZIP Optimal | 21606400 | 21606400 | 5451507 | -74.7690% | 3.9634 | 3 | True |
| Silesia | sao | NTFS compact | 7251944 | 7251944 | 6832128 | -5.7890% | 1.0614 | 3 | True |
| Silesia | sao | ZIP Optimal | 7251944 | 7251944 | 5331897 | -26.4763% | 1.3601 | 3 | True |
| Silesia | webster | NTFS compact | 41458703 | 41458703 | 23785472 | -42.6285% | 1.7430 | 3 | True |
| Silesia | webster | ZIP Optimal | 41458703 | 41458703 | 12214053 | -70.5392% | 3.3943 | 3 | True |
| Silesia | x-ray | NTFS compact | 8474240 | 8474240 | 8364032 | -1.3005% | 1.0132 | 3 | True |
| Silesia | x-ray | ZIP Optimal | 8474240 | 8474240 | 6045219 | -28.6636% | 1.4018 | 3 | True |
| Silesia | xml | NTFS compact | 5345280 | 5345280 | 2093056 | -60.8429% | 2.5538 | 3 | True |
| Silesia | xml | ZIP Optimal | 5345280 | 5345280 | 688095 | -87.1271% | 7.7682 | 3 | True |

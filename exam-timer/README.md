# Located at [this link](https://cs1332-exam-timer-407797320918.us-east1.run.app/)

# Deploy changes
- Go to `exam-timer` directory
- Run `npm run build`
- Go to root directory
- Run `gcloud run deploy cs1332-exam-timer --source .`
- Make sure Google Cloud CLI is installed and is  using project `loyal-lore-410819`.
- Cloud Run console is [here](https://console.cloud.google.com/run/detail/us-east1/cs1332-exam-timer/metrics?authuser=2&project=loyal-lore-410819).
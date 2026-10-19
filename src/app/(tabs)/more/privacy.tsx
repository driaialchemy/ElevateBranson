import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';

const policyUrl = 'https://elevatebranson.org/privacy-policy/';

export default function PrivacyScreen() {
  return (
    <Screen>
      <Card
        body="Volunteer forms, tour requests, and prayer requests collect only what staff need to reply. The app does not put what you type into its logs. A prayer request stays private unless you turn on sharing. If you are offline, the request stays on this phone until it can be sent, then it is removed from the phone. If you turn on notifications, the phone token is saved with your topic choices and not with your name. A gift or a shirt purchase happens on the Elevate Branson website. This app does not store card numbers. An event reminder and a calendar entry stay on this phone."
        title="Privacy"
      />
      <Card
        body="The website privacy policy was written for the website. An update that covers this app is still needed."
        title="Website policy"
      />
      <Button label="Open the website privacy policy" onPress={() => openExternal(policyUrl)} />
    </Screen>
  );
}

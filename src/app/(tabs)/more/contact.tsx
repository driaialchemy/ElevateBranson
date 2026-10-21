import { AddressCard } from '@/components/AddressCard';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { openCall, openExternal, openHref, openMap } from '@/components/openLink';
import { useContent } from '@/content/client';
import { contactFormTarget } from '@/content/getInvolved';

const departments = [
  ['Admin', 'Bryan Stallings', '417.294.1300'], ['Admin', 'Amy Stallings', '417.335.0266'], ['Admin', 'Hannah Witcher', '417.356.3739'], ['Facility Rentals', 'Matt Grindstaff', '417.598.0962'],
  ['Coffee', 'Roger Nettles', '417.335.9915'], ['Connections', '', '417.239.7818'], ['Entrepreneurs', 'Chris Hunter', '417.335.9915'], ['Kids', 'Cathy Brown', '417.243.0644'],
  ['Health', '', '417.243.0660'], ['Outreach', 'Betsy Foster', '417.593.2254'], ['Rides', 'Dan Friday', '417.295.7575'], ['Thrift', 'Ethan Fullington', '417.986.1188'], ['Work', 'Donna McConkey', '417.527.1709'],
] as const;

export default function ContactScreen() {
  const { data } = useContent();
  const { address, phone, infoEmail, sourceUrl } = data.siteSettings;
  return <Screen><ContentNotice /><SectionHeader label="Contact Elevate Branson" />{address ? <AddressCard address={address} phone={phone} email={infoEmail} /> : null}<Button label="Google Maps" onPress={() => openMap(address)} /><SectionHeader label="Department contacts" />{departments.map(([program, name, number], index) => <Card key={`${program}-${index}`} title={program} body={[name, number].filter(Boolean).join('\n')} />)}{departments.map(([program, , number], index) => <Button key={`call-${program}-${index}`} label={`Call ${program}${departments.filter((row) => row[0] === program).length > 1 ? ` ${index + 1}` : ''}`} onPress={() => openCall(number)} />)}<SectionHeader label="Send a message" /><Card title="Website contact form" body="The website form asks for Name, Email, Program, Message, and optional Phone." /><Button label="Open contact form" onPress={() => { const target = contactFormTarget(); if (target.startsWith('http')) openExternal(sourceUrl || target); else openHref(target); }} /></Screen>;
}

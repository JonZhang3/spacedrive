import {
	Books,
	ChartBar,
	Cloud,
	Database,
	FlyingSaucer,
	GearSix,
	HardDrive,
	Key,
	KeyReturn,
	PaintBrush,
	PuzzlePiece,
	Receipt,
	ShieldCheck,
	TagSimple,
	User
} from '@phosphor-icons/react';
import { useFeatureFlag } from '@sd/client';
import { tw } from '@sd/ui';
import { useLocale, useOperatingSystem } from '~/hooks';
import { usePlatform } from '~/util/Platform';

import Icon from '../Layout/Sidebar/Icon';
import SidebarLink from '../Layout/Sidebar/Link';
import { NavigationButtons } from '../TopBar/NavigationButtons';

const Heading = tw.div`mb-1 ml-1 text-xs font-semibold text-gray-400`;
const Section = tw.div`space-y-0.5`;

export default () => {
	const { platform } = usePlatform();
	const os = useOperatingSystem();

	// const isPairingEnabled = useFeatureFlag('p2pPairing');
	const isBackupsEnabled = useFeatureFlag('backups');

	const { t } = useLocale();

	return (
		<div className="custom-scroll no-scrollbar h-full w-60 max-w-[180px] shrink-0 border-r border-app-line/50 pb-5">
			{platform === 'tauri' ? (
				<div
					data-tauri-drag-region={os === 'macOS'}
					className="mb-3 h-3 w-full p-3 pl-[14px] pt-[10px]"
				>
					<NavigationButtons />
				</div>
			) : (
				<div className="h-3" />
			)}

			<div className="space-y-6 px-4 py-3">
				<Section>
					<Heading>{t('client')}</Heading>
					<SidebarLink to="client/general">
						<Icon component={GearSix} />
						{t('general')}
					</SidebarLink>
					<SidebarLink to="client/usage">
						<Icon component={ChartBar} />
						{t('usage')}
					</SidebarLink>
					<SidebarLink to="client/account">
						<Icon component={User} />
						{t('account')}
					</SidebarLink>
					<SidebarLink to="node/libraries">
						<Icon component={Books} />
						{t('libraries')}
					</SidebarLink>
					<SidebarLink to="client/privacy">
						<Icon component={ShieldCheck} />
						{t('privacy')}
					</SidebarLink>
					<SidebarLink to="client/appearance">
						<Icon component={PaintBrush} />
						{t('appearance')}
					</SidebarLink>
					<SidebarLink to="client/backups" disabled={!isBackupsEnabled}>
						<Icon component={Database} />
						{t('backups')}
					</SidebarLink>
					<SidebarLink to="client/keybindings">
						<Icon component={KeyReturn} />
						{t('keybinds')}
					</SidebarLink>
					<SidebarLink to="client/extensions" disabled>
						<Icon component={PuzzlePiece} />
						{t('extensions')}
					</SidebarLink>
				</Section>
				<Section>
					<Heading>{t('library')}</Heading>
					<SidebarLink to="library/general">
						<Icon component={GearSix} />
						{t('general')}
					</SidebarLink>
					{/* <SidebarLink to="library/nodes" disabled={!isPairingEnabled}>
						<Icon component={ShareNetwork} />
						Nodes
					</SidebarLink> */}
					<SidebarLink to="library/locations">
						<Icon component={HardDrive} />
						{t('locations')}
					</SidebarLink>
					<SidebarLink to="library/tags">
						<Icon component={TagSimple} />
						{t('tags')}
					</SidebarLink>
					{/* <SidebarLink to="library/saved-searches">
						<Icon component={MagnifyingGlass} />
						Saved Searches
					</SidebarLink> */}
					<SidebarLink disabled to="library/clouds">
						<Icon component={Cloud} />
						{t('clouds')}
					</SidebarLink>
					<SidebarLink to="library/keys" disabled>
						<Icon component={Key} />
						{t('keys')}
					</SidebarLink>
				</Section>
				<Section>
					<Heading>{t('resources')}</Heading>
					<SidebarLink to="resources/about">
						<Icon component={FlyingSaucer} />
						{t('about')}
					</SidebarLink>
					<SidebarLink to="resources/changelog">
						<Icon component={Receipt} />
						{t('changelog')}
					</SidebarLink>
					{/* <SidebarLink to="resources/dependencies">
						<Icon component={Graph} />
						Dependencies
					</SidebarLink>
					<SidebarLink to="resources/support">
						<Icon component={Heart} />
						Support
					</SidebarLink> */}
				</Section>
			</div>
		</div>
	);
};

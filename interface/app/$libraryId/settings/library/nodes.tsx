import {
	useBridgeMutation,
	useBridgeQuery,
	useCache,
	useConnectedPeers,
	useDiscoveredPeers,
	useFeatureFlag,
	useNodes
} from '@sd/client';
import { Button } from '@sd/ui';
import { startPairing } from '~/app/p2p/pairing';
import { useLocale } from '~/hooks';

import { Heading } from '../Layout';

export const Component = () => {
	const isPairingEnabled = useFeatureFlag('p2pPairing');
	const node = useBridgeQuery(['nodeState']);
	const { t } = useLocale();

	return (
		<>
			<Heading title={t('nodes')} description={t('nodes_description')} />
			{/* TODO: Show paired nodes + unpair button */}

			{/* TODO: Replace with modal */}
			{node.data?.p2p_enabled === false ? (
				<p>P2P is disabled. Please enable it in settings!</p>
			) : (
				<>{isPairingEnabled && <IncorrectP2PPairingPane />}</>
			)}
		</>
	);
};

// TODO: This entire component shows a UI which is pairing by node but that is just not how it works.
function IncorrectP2PPairingPane() {
	const { t } = useLocale();
	const onlineNodes = useDiscoveredPeers();
	const connectedNodes = useConnectedPeers();
	const p2pPair = useBridgeMutation('p2p.pair', {
		onSuccess(data) {
			console.log(data);
		}
	});

	const nlmState = {
		data: JSON.stringify('lol no')
	};
	// TODO: Bring this back
	// useBridgeQuery(['p2p.state'], {
	// 	refetchInterval: 1000
	// });
	const result = useBridgeQuery(['library.list']);
	useNodes(result.data?.nodes);
	const libraries = useCache(result.data?.items);

	return (
		<>
			<div className="flex-space-4 flex w-full">
				<div className="flex-[50%]">
					<h1>Pairing</h1>
					{[...onlineNodes.entries()].map(([id, node]) => (
						<div key={id} className="flex space-x-2">
							<p>{node.name}</p>

							<Button
								onClick={() => {
									// TODO: This is not great
									p2pPair.mutateAsync(id).then((id) =>
										startPairing(id, {
											name: node.name,
											os: node.operating_system
										})
									);
								}}
							>
								{t('pair')}
							</Button>
						</div>
					))}
				</div>
				<div className="flex-[50%]">
					<h1 className="mt-4">{t('connected')}</h1>
					{[...connectedNodes.entries()].map(([id, node]) => (
						<div key={id} className="flex space-x-2">
							<p>{id}</p>
						</div>
					))}
				</div>
			</div>
			<div>
				<p>NLM State:</p>
				<pre className="pl-5">{JSON.stringify(nlmState.data || {}, undefined, 2)}</pre>
			</div>
			<div>
				<p>Libraries:</p>
				{libraries?.map((v) => (
					<div key={v.uuid} className="pb-2">
						<p>
							{v.config.name} - {v.uuid}
						</p>
						<div className="pl-5">
							<p>Instance: {`${v.config.instance_id}/${v.instance_id}`}</p>
							<p>Instance PK: {`${v.instance_public_key}`}</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

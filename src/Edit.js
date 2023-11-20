import { useState, useEffect, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { produce } from 'immer';
import ReactPlayer from 'react-player';
import Plyr from "plyr-react"
import 'vidstack/player';
import 'vidstack/player/layouts';
import 'vidstack/player/ui';


// Settings Components
import { BplMediaPlaceholder } from '../../Components';
import { tabController } from '../../Components/utils/functions';

import Settings from './Settings';
import Style from './Style';

const Edit = props => {
	const { className, attributes, setAttributes, clientId, isSelected } = props;
	const { items, columns, layout, content, icon, img, video, posterUrl, videoTitle, isCaption, isChapter, chapterUrl, captionUrl } = attributes;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	useEffect(() => tabController(), [isSelected]);

	const [activeIndex, setActiveIndex] = useState(0);
	const [render, setRender] = useState(false);

	const updateItem = (type, val, childType = false) => {
		const newItems = produce(items, draft => {
			if (childType) {
				draft[activeIndex][type][childType] = val;
			} else {
				draft[activeIndex][type] = val;
			}
		});
		setAttributes({ items: newItems });
	}

	setAttributes(() => {
		setRender(!render);
	}, [video, posterUrl, videoTitle])






	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} updateItem={updateItem} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

		<div className={className} id={`vidstackMediaPlayer-${clientId}`}>
			<Style attributes={attributes} clientId={clientId} />

			<media-player title={videoTitle} src={video.url}>
				<media-provider>
					{isCaption && <track
						src={captionUrl}
						kind="subtitles"
						label="English"
						default
						data-type="vtt"
					/>
					}
					{isChapter && <track
						src={chapterUrl}
						kind="chapters"
						default
						data-type="vtt"
					/>
					}
					<media-poster
						class="vds-poster"
						src={posterUrl.url}
					></media-poster>

				</media-provider>
				<media-video-layout ></media-video-layout>
			</media-player>

		</div >
	</>;
};


export default Edit;
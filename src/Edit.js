import { useState, useEffect, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { produce } from 'immer';
import ReactPlayer from 'react-player';
import Plyr from "plyr-react"
import 'vidstack/player';
import 'vidstack/player/layouts';
import 'vidstack/player/ui';
import { playerTab } from '../src/utils/options';

// Settings Components
import { BplMediaPlaceholder } from '../../Components';
import { tabController } from '../../Components/utils/functions';

import Settings from './Settings';
import Style from './Style';
import { TabPanel } from '@wordpress/components';

const Edit = props => {

	const { className, attributes, setAttributes, clientId, isSelected } = props;
	const { items, columns, layout, content, icon, img, video, audio, audioTitle, audioPosterUrl, posterUrl, videoTitle, isCaption, isChapter, chapterUrl, captionUrl, chapterItems, chapterSource, buildedUrl, tabs, captionItems } = attributes;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId
	useEffect(() => tabController(), [isSelected]);



	const Track = () => <track
		src={chapterUrl}
		kind="chapters"
		default
		data-type="vtt"
	/>

	const Caption = () => {

		return (
			captionItems.map((item, index) => {
				const { label, captionUrl } = item
				return (
					<track
						key={index}
						src={captionUrl}
						kind="subtitles"
						label={label}
						default
						data-type="vtt"
					/>
				)
			})
		)

	}



	const [activeIndex, setActiveIndex] = useState(0);
	const [render, setRender] = useState(true);

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

	}, [video, posterUrl, videoTitle, isChapter, buildedUrl, chapterUrl, captionItems])





	return <>

		<Settings attributes={attributes} setAttributes={setAttributes} updateItem={updateItem} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

		<div className={className} id={`vidstackMediaPlayer-${clientId}`}>
			<Style attributes={attributes} clientId={clientId} />




			{"video" === tabs &&

				<media-player title={videoTitle} src={video.url} playsinline  >
					<media-provider>
						<media-gesture className="vds-gesture" event="pointerup" action="toggle:paused"></media-gesture>
						<media-gesture className="vds-gesture" event="pointerup" action="toggle:controls"></media-gesture>
						<media-gesture className="vds-gesture" event="dblpointerup" action="seek:-10"></media-gesture>
						<media-gesture className="vds-gesture" event="dblpointerup" action="seek:10"></media-gesture>
						<media-gesture
							class="vds-gesture"
							event="dblpointerup"
							action="toggle:fullscreen"
						></media-gesture>

						{isCaption && <Caption />}


						{
							chapterSource == "file" && chapterUrl && isChapter &&
							<Track />
						}
						{
							chapterSource == "build_own" && buildedUrl && isChapter &&
							<track
								src={buildedUrl}
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
			}

			{"audio" === tabs &&

				<media-player title={audioTitle} src={audio.url} playsinline  >
					<media-provider>
						<media-gesture className="vds-gesture" event="pointerup" action="toggle:paused"></media-gesture>
						<media-gesture className="vds-gesture" event="pointerup" action="toggle:controls"></media-gesture>
						<media-gesture className="vds-gesture" event="dblpointerup" action="seek:-10"></media-gesture>
						<media-gesture className="vds-gesture" event="dblpointerup" action="seek:10"></media-gesture>
						<media-gesture
							class="vds-gesture"
							event="dblpointerup"
							action="toggle:fullscreen"
						></media-gesture>

						{isCaption && <Caption />}

						{
							chapterSource == "file" && chapterUrl && isChapter &&
							<Track />
						}
						{
							chapterSource == "build_own" && buildedUrl && isChapter &&
							<track
								src={buildedUrl}
								kind="chapters"
								default
								data-type="vtt"
							/>
						}
						<media-poster
							class="vds-poster"
							src={audioPosterUrl.url}
						></media-poster>


					</media-provider>

					<media-audio-layout ></media-audio-layout>
				</media-player>

			}










		</div >
	</>;
};


export default Edit;
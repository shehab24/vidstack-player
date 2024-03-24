import { render } from 'react-dom';
import './style.scss';
import Style from './Style';
import 'vidstack/player';
import 'vidstack/player/layouts';
import 'vidstack/player/ui';


document.addEventListener('DOMContentLoaded', () => {
	const blockEls = document.querySelectorAll('.wp-block-vidstack-mediaPlayer');

	blockEls.forEach(blockEl => {
		const attributes = JSON.parse(blockEl.dataset.attributes);

		render(<>
			<Style attributes={attributes} clientId={attributes.cId} />

			<BlockName attributes={attributes} />
		</>, blockEl);

		blockEl?.removeAttribute('data-attributes');
	});
});

const BlockName = ({ attributes }) => {
	const { items, columns, layout, content, icon, img, video, audio, posterUrl, videoTitle, audioTitle, isCaption, isChapter, chapterUrl, captionUrl, chapterSource, buildedUrl, tabs, audioPosterUrl, captionItems } = attributes;



	return (
		<>
			{"video" === tabs && <media-player title={videoTitle} src={video.url} playsinline>
				<media-provider>
					{isCaption &&
						<>
							{
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
							}
						</>

					}
					{isChapter && <track
						src={
							chapterSource === 'build_own'
								? buildedUrl
								: chapterUrl
						}
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

						{isCaption &&
							<>
								{
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
								}
							</>


						}
						{isChapter && <track
							src={
								chapterSource === 'build_own'
									? buildedUrl
									: chapterUrl
							}
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
		</>
	)
}
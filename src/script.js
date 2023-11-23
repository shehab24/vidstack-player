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
	const { items, columns, layout, content, icon, img, video, posterUrl, videoTitle, isCaption, isChapter, chapterUrl, captionUrl, chapterSource, buildedUrl } = attributes;



	return (

		<media-player title={videoTitle} src={video.url} playsinline>
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
	)
}
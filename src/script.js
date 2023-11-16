import { render } from 'react-dom';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { Poster } from '@vidstack/react';
import { SeekButton } from "@vidstack/react";
import { SeekBackwardIcon, SeekForwardIcon } from '@vidstack/react/icons';

import './style.scss';
import Style from './Style';

// Block Name
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
	const { items, columns, layout, content, icon, img, video, posterUrl } = attributes;

	return <div className={`vidstackMediaPlayer columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile} ${layout || 'vertical'}`}>

	</div>
}
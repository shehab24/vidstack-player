import { registerBlockType } from '@wordpress/blocks';

import metadata from '../inc/block.json';
import Edit from './Edit';
import './editor.scss';
import { vidstackMediaPlayer } from './utils/icons';

registerBlockType(metadata, {
	icon: vidstackMediaPlayer,

	// Build in Functions
	edit: Edit,

	save: () => null
});
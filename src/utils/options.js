import { __ } from '@wordpress/i18n';

import { verticalLineIcon, horizontalLineIcon } from './icons';

export const layouts = [
	{ label: __('Vertical', 'textdomain'), value: 'vertical', icon: verticalLineIcon },
	{ label: __('Horizontal', 'textdomain'), value: 'horizontal', icon: horizontalLineIcon }
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'textdomain') },
	{ name: 'style', title: __('Style', 'textdomain') }
];

export const sourceType = [
	{ label: __('File', 'textdomain'), value: 'file' },
	{ label: __('Build Your Own', 'textdomain'), value: 'build_own' }
];
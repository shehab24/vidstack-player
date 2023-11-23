import { getBackgroundCSS, getBorderCSS, getColorsCSS, getIconCSS, getSeparatorCSS, getMultiShadowCSS, getSpaceCSS, getTypoCSS } from '../../Components/utils/getCSS';

const Style = ({ attributes, clientId }) => {
	const { columnGap, rowGap, alignment, textAlign, width, background, typography, color, colors, icon, separator, padding, margin, border, shadow, captionColor, captionBgColor, chapterColor, settingsColor, volumeColor, mediaTimeColor, globalSliderColor, chapterBgColor, settingsBgColor, volumeBgColor, playbtnColor, playbtnBgColor, pipbtnBgColor, pipbtnColor, screenbtnBgColor, screenbtnColor, mediaTitleColor } = attributes;

	const mainSl = `#vidstackMediaPlayer-${clientId}`;
	const blockSl = `${mainSl} .vidstackMediaPlayer`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS('', typography)?.googleFontLink}
		${getTypoCSS(`${blockSl} .content`, typography)?.styles}

		${mainSl}{
			text-align: ${alignment};
		}
		${blockSl}{
			grid-gap: ${rowGap} ${columnGap};
			text-align: ${textAlign};
			width: ${['0px', '0%', '0em'].includes(width) ? 'auto' : width};
			${getBackgroundCSS(background)}
			padding: ${getSpaceCSS(padding)};
			margin: ${getSpaceCSS(margin)};
			${getBorderCSS(border)}
			box-shadow: ${getMultiShadowCSS(shadow)};
		}
		${blockSl} .content{
			color: ${color};
			${getColorsCSS(colors)}
		}
		${blockSl} .icon{
			${getIconCSS(icon)}
		}
		${blockSl} .separator{
			${getSeparatorCSS(separator)}
		}
		 ${mainSl} media-caption-button.vds-caption-button.vds-button{
            color: ${captionColor} !important;
		 }
		 ${mainSl} media-caption-button.vds-caption-button.vds-button:hover{
			background-color : ${captionBgColor} !important ;
		 }
		 ${mainSl} media-menu-button#media-menu-button-1{
            color: ${chapterColor} !important;
		 }
		 ${mainSl} media-menu-button#media-menu-button-1:hover{
            background-color: ${chapterBgColor} !important;
		 }
		 ${mainSl} media-menu-button#media-menu-button-2{
            color: ${settingsColor} !important;
		 }
		 ${mainSl} media-menu-button#media-menu-button-2:hover{
            background-color: ${settingsBgColor} !important;
		 }
		 ${mainSl} media-mute-button.vds-mute-button.vds-button{
            color: ${volumeColor} !important;
		 }
		 ${mainSl} media-mute-button.vds-mute-button.vds-button:hover{
            background-color: ${volumeBgColor} !important;
		 }
		 ${mainSl} media-play-button.vds-play-button.vds-button{
            color: ${playbtnColor} !important;
		 }
		 ${mainSl} media-play-button.vds-play-button.vds-button:hover{
            background-color: ${playbtnBgColor} !important;
		 }
		 ${mainSl} media-pip-button.vds-pip-button.vds-button{
            color: ${pipbtnColor} !important;
		 }
		 ${mainSl} media-pip-button.vds-pip-button.vds-button:hover{
            background-color: ${pipbtnBgColor} !important;
		 }
		 ${mainSl} media-fullscreen-button.vds-fullscreen-button.vds-button{
            color: ${screenbtnColor} !important;
		 }
		 ${mainSl} media-fullscreen-button.vds-fullscreen-button.vds-button:hover{
            background-color: ${screenbtnBgColor} !important;
		 }
		 ${mainSl}  .vds-slider-track-fill.vds-slider-track{
			background-color: ${globalSliderColor} !important ;
          
		 }
		 ${mainSl} media-time.vds-time{
            color: ${mediaTimeColor} !important;
		 }
		 ${mainSl} .vds-time-divider{
            color: ${mediaTimeColor} !important;
		 }
		 ${mainSl} media-chapter-title.vds-chapter-title{
            color: ${mediaTitleColor} !important;
		 }
	`}} />;
}
export default Style;
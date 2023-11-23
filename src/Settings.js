import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, TextControl, ToggleControl, SelectControl, CheckboxControl, RadioControl, RangeControl, __experimentalUnitControl as UnitControl, __experimentalNumberControl as NumberControl, Button, Dashicon, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { produce } from 'immer';

// Settings Components
import { Label, Background, BColor, BDevice, BorderControl, BtnGroup, ColorsControl, IconControl, InlineDetailMediaUpload, MultiShadowControl, SeparatorControl, SpaceControl, Typography, InlineMediaUpload } from '../../Components';
import { gearIcon } from '../../Components/utils/icons';
import { tabController } from '../../Components/utils/functions';
import { emUnit, perUnit, pxUnit } from '../../Components/utils/options';

import { generalStyleTabs, layouts, sourceType } from './utils/options';

const Settings = ({ attributes, setAttributes, updateItem, activeIndex, setActiveIndex }) => {
	const { items, chapterItems, columns, columnGap, rowGap, layout, chapterSource, alignment, textAlign, width, background, typography, color, colors, isIcon, icon, img, separator, padding, margin, border, shadow, video, posterUrl, videoTitle, isCaption, isChapter, captionUrl, chapterUrl, captionColor, captionBgColor, chapterColor, settingsColor, volumeColor, mediaTimeColor, globalSliderColor, chapterBgColor, settingsBgColor, volumeBgColor, playbtnColor, playbtnBgColor, pipbtnColor, pipbtnBgColor, screenbtnBgColor, screenbtnColor, mediaTitleColor, buildedUrl } = attributes;

	const [device, setDevice] = useState('desktop');

	const buildNow = () => {
		const vttContent = `WEBVTT
			${chapterItems.map((item, index) => {
			return `
				${item.start} --> ${item.end}
				${item.chapterText}\n
				`
		}).join('')}
		`;




		jQuery.ajax({
			type: 'POST',
			url: RestVars.endpoint,
			data: {
				action: 'upload_chapter_data_media',
				formdata: chapterItems,
			},
			success(response) {
				const newRes = JSON.parse(response);
				setAttributes({ buildedUrl: newRes.upload_url });



			}
		});

	};




	const addItem = () => {
		const prevL = chapterItems.length;

		setAttributes({
			chapterItems: [...chapterItems, {
				start: chapterItems[prevL - 1].end,
				end: "",
				chapterText: `Chapter ${prevL + 1}`
			}]
		});
		setActiveIndex(items.length);
	}

	const updateChapter = (index, property, val) => {
		const newChapter = produce(chapterItems, draft => {
			draft[index][property] = val;
		});
		setAttributes({ chapterItems: newChapter });
	}

	const updateAllItem = (type, val, otherType = false) => {
		const newItems = [...items];

		newItems.map((item, index) => {
			if (otherType) {
				newItems[index][type][otherType] = val;
			} else {
				newItems[index][type] = val;
			}
		});
		setAttributes({ items: newItems });
	}

	const duplicateItem = e => {
		e.preventDefault();

		setAttributes({ items: [...items.slice(0, activeIndex), { ...items[activeIndex] }, ...items.slice(activeIndex)] });

		setActiveIndex(activeIndex + 1);
	}

	const removeItem = (e, index) => {
		e.preventDefault();
		setAttributes({ chapterItems: [...chapterItems.slice(0, index), ...chapterItems.slice(index + 1)] });
	}

	const { number = '', text = '' } = items[activeIndex] || {};


	return <>
		<InspectorControls>
			<div className='prefixInspectorInfo'>
				Need more block like this? Checkout the bundle ➡ <a href='https://wordpress.org/plugins/b-blocks' target='_blank' rel='noopener noreferrer'>B Blocks</a>
			</div>

			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
				{'general' === tab.name && <>
					<PanelBody className='bPlPanelBody addRemoveItems editItem' title={__('Add or Remove Items', 'textdomain')}>
						{null !== activeIndex && <>
							<h3 className='bplItemTitle'>{__(`Item ${activeIndex + 1}:`, 'textdomain')}</h3>

							<PanelRow>

								<TextControl label="Start" value={text} onChange={val => updateItem('text', val)} />
								<TextControl label="Start" value={text} onChange={val => updateItem('text', val)} />
							</PanelRow>


							<PanelRow className='itemAction mt20 mb15'>
								{1 < items?.length && <Button className='removeItem' label={__('Remove', 'textdomain')} onClick={removeItem}><Dashicon icon='no' />{__('Remove', 'textdomain')}</Button>}

								<Button className='duplicateItem' label={__('Duplicate', 'textdomain')} onClick={duplicateItem}>{gearIcon}{__('Duplicate', 'textdomain')}</Button>
							</PanelRow>
						</>}

						<div className='addItem'>
							<Button label={__('Add New Card', 'textdomain')} onClick={addItem}><Dashicon icon='plus' size={23} />{__('Add New Card', 'textdomain')}</Button>
						</div>
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Add Video Information', 'textdomain')} initialOpen={true}>
						<InlineDetailMediaUpload types='video' label="Enter Your Video Url" value={video} onChange={(val) => { setAttributes({ video: val }) }} />
						<Label>{__('Enter Video Title:', 'textdomain')}</Label>
						<TextControl value={videoTitle} onChange={val => setAttributes({ videoTitle: val })} />

						<InlineDetailMediaUpload className="mt20" types='image' label="Enter Your Poster Url" value={posterUrl} onChange={(val) => { setAttributes({ posterUrl: val }) }} />

						<ToggleControl className='mt20' label={__('Show Caption Option?', 'textdomain')} checked={isCaption} onChange={val => setAttributes({ isCaption: val })} />
						{isCaption && <Label>{__('Enter Caption Url:', 'textdomain')}</Label>}
						{isCaption && <TextControl placeholder='Enter a Source link' value={captionUrl} help="Example:https://example.com/subtitle.vtt" onChange={val => setAttributes({ captionUrl: val })} />}





						{/*<CheckboxControl className='mt20' label={__('Toggle?', 'textdomain')} checked={isIcon} onChange={val => setAttributes({ isIcon: val })} />

						<PanelRow>
							<Label mt='0' mb='0'>{__('Layout:', 'textdomain')}</Label>
							<SelectControl value={layout} onChange={val => {
								setAttributes({ layout: val });
								'vertical' === val && updateAllItem('number', 10);
								'horizontal' === val && updateAllItem('number', 20);
							}} options={layouts} />
						</PanelRow>
						<small>{__('Some settings may change when layout will be changed.', 'textdomain')}</small>

						<PanelRow>
							<Label mt='0' mb='0'>{__('Layout:', 'b-blocks')}</Label>
							<RadioControl selected={layout} onChange={val => setAttributes({ layout: val })} options={layouts} />
						</PanelRow>

						<UnitControl className='mt20' label={__('Width:', 'textdomain')} labelPosition='left' value={width} onChange={val => setAttributes({ width: val })} units={[pxUnit(900), perUnit(100), emUnit(56)]} isResetValueOnUnitChange={true} />
						<small>{__('Keep width 0, to auto width.', 'textdomain')}</small> */}
					</PanelBody>

					<PanelBody className='bPlPanelBody' title={__('Add Chapter', 'textdomain')} initialOpen={false}>
						<ToggleControl className='mt20' label={__('Show Chapters Option?', 'textdomain')} checked={isChapter} onChange={val => setAttributes({ isChapter: val })} />

						{isChapter && <Label mt='0' mb='0'>{__('Source type:', 'b-blocks')}</Label>}
						{isChapter && <RadioControl selected={chapterSource} onChange={(val) => {
							setAttributes({ chapterSource: val })

						}} options={sourceType} />}

						{chapterSource == "file" && isChapter && <InlineMediaUpload label="Enter a Url/File" value={chapterUrl} onChange={val => setAttributes({ chapterUrl: val })} className="mt10" types={['vtt']} />}



						{chapterSource == "build_own" && isChapter && <PanelBody className='bPlPanelBody addRemoveItems editItem mt20' title={__('Add Chapter TimeFrame', 'textdomain')}>



							{
								chapterItems.map((item, index) => {

									const { start, end, chapterText } = item;

									return (
										<div key={index}>

											<PanelRow >

												<TextControl label="Start" value={start} onChange={val => updateChapter(index, 'start', val)} />
												<TextControl label="End" value={end} onChange={val => updateChapter(index, 'end', val)} />
											</PanelRow>
											<TextControl placeholder='Enter Chapter Title' value={chapterText} onChange={val => updateChapter(index, 'chapterText', val)} />
											<PanelRow className='itemAction mt20 mb15'>
												{1 < chapterItems?.length && <Button className='removeItem' label={__('Remove', 'textdomain')} onClick={(e) => removeItem(e, index)}><Dashicon icon='no' />{__('Remove', 'textdomain')}</Button>}
											</PanelRow>
										</div>
									)
								})
							}





							<div className='addItem'>
								<Button label={__('Add New ', 'textdomain')} onClick={addItem}><Dashicon icon='plus' size={23} />{__('Add New ', 'textdomain')}</Button>

							</div>

							<div className='itemAction mt20 '>
								<Button className='removeItem' label={__('Build Now', 'textdomain')} onClick={buildNow} ><Dashicon icon='plus' />{__('Build Now', 'textdomain')}</Button>

								<TextControl className='mt10' placeholder='Builded Url Will be here' value={buildedUrl} />
							</div>


						</PanelBody>}
					</PanelBody>


					{/* <PanelBody className='bPlPanelBody' title={__('Custom Components', 'textdomain')} initialOpen={false}>
						<PanelRow>
							<Label mt='0'>{__('Columns:', 'textdomain')}</Label>
							<BDevice device={device} onChange={val => setDevice(val)} />
						</PanelRow>
						<RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />

						<UnitControl className='mt20' label={__('Column Gap:', 'textdomain')} labelPosition='left' value={columnGap} onChange={val => setAttributes({ columnGap: val })} units={[pxUnit(30), perUnit(3), emUnit(2)]} isResetValueOnUnitChange={true} />

						<UnitControl className='mt20' label={__('Row Gap:', 'textdomain')} labelPosition='left' value={rowGap} onChange={val => setAttributes({ rowGap: val })} units={[pxUnit(40), perUnit(3), emUnit(2.5)]} isResetValueOnUnitChange={true} />

						<InlineDetailMediaUpload className='mt10' value={img} onChange={val => setAttributes({ img: val })} placeholder={__('Enter Image URL', 'textdomain')} />

						<IconControl className='mt20' icon={icon} onChange={val => setAttributes({ icon: val })} defaults={{ class: 'fab fa-wordpress' }} version={6} />

						<PanelRow>
							<Label mt='0'>{__('Position:', 'textdomain')}</Label>
							<BtnGroup value={layout} onChange={val => {
								setAttributes({ layout: val });
								'vertical' === val && updateAllItem('number', 10);
								'horizontal' === val && updateAllItem('number', 20);
							}} options={layouts} isIcon={true} />
						</PanelRow>
						<small>{__('Some settings may change when layout will be changed.', 'textdomain')}</small>
					</PanelBody> */}
				</>}


				{'style' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('All Control Style', 'textdomain')}>

						<PanelBody className='bPlPanelBody' title={__('Global Slider Style', 'textdomain')}>
							<BColor label={__('Slider Control Color:', 'textdomain')} value={globalSliderColor} onChange={val => setAttributes({ globalSliderColor: val })} />
						</PanelBody>


						<PanelBody className='bPlPanelBody' title={__('Caption Control Color', 'textdomain')} initialOpen={false}>
							<BColor label={__(' Background Color:', 'textdomain')} value={captionBgColor} onChange={val => setAttributes({ captionBgColor: val })} defaultColor='#ffffff33' />
							<BColor label={__(' Icon Color:', 'textdomain')} value={captionColor} onChange={val => setAttributes({ captionColor: val })} defaultColor='#fff' />
						</PanelBody>

						<PanelBody className='bPlPanelBody' title={__('Chapter Control Color', 'textdomain')} initialOpen={false}>
							<BColor label={__(' Background Color:', 'textdomain')} value={chapterBgColor} onChange={val => setAttributes({ chapterBgColor: val })} defaultColor='#ffffff33' />
							<BColor label={__(' Icon Color:', 'textdomain')} value={chapterColor} onChange={val => setAttributes({ chapterColor: val })} defaultColor='#fff' />
						</PanelBody>

						<PanelBody className='bPlPanelBody' title={__('Settings Control Color', 'textdomain')} initialOpen={false}>
							<BColor label={__(' Background Color:', 'textdomain')} value={settingsBgColor} onChange={val => setAttributes({ settingsBgColor: val })} defaultColor='#ffffff33' />
							<BColor label={__('Icon Color:', 'textdomain')} value={settingsColor} onChange={val => setAttributes({ settingsColor: val })} defaultColor='#fff' />
						</PanelBody>


						<PanelBody className='bPlPanelBody' title={__('Volume Control Color', 'textdomain')} initialOpen={false}>
							<BColor label={__(' Background Color:', 'textdomain')} value={volumeBgColor} onChange={val => setAttributes({ volumeBgColor: val })} defaultColor='#ffffff33' />
							<BColor label={__('Icon Color:', 'textdomain')} value={volumeColor} onChange={val => setAttributes({ volumeColor: val })} defaultColor='#fff' />
						</PanelBody>


						<PanelBody className='bPlPanelBody' title={__('Play Button Color', 'textdomain')} initialOpen={false}>
							<BColor label={__(' Background Color:', 'textdomain')} value={playbtnBgColor} onChange={val => setAttributes({ playbtnBgColor: val })} defaultColor='#ffffff33' />
							<BColor label={__('Icon Color:', 'textdomain')} value={playbtnColor} onChange={val => setAttributes({ playbtnColor: val })} defaultColor='#fff' />
						</PanelBody>

						<PanelBody className='bPlPanelBody' title={__('Pip Button Color', 'textdomain')} initialOpen={false}>
							<BColor label={__(' Background Color:', 'textdomain')} value={pipbtnBgColor} onChange={val => setAttributes({ pipbtnBgColor: val })} defaultColor='#ffffff33' />
							<BColor label={__('Icon Color:', 'textdomain')} value={pipbtnColor} onChange={val => setAttributes({ pipbtnColor: val })} defaultColor='#fff' />
						</PanelBody>

						<PanelBody className='bPlPanelBody' title={__('Full Screen Button Color', 'textdomain')} initialOpen={false}>
							<BColor label={__(' Background Color:', 'textdomain')} value={screenbtnBgColor} onChange={val => setAttributes({ screenbtnBgColor: val })} defaultColor='#ffffff33' />
							<BColor label={__('Icon Color:', 'textdomain')} value={screenbtnColor} onChange={val => setAttributes({ screenbtnColor: val })} defaultColor='#fff' />
						</PanelBody>







						<BColor label={__('Media Time Color:', 'textdomain')} value={mediaTimeColor} onChange={val => setAttributes({ mediaTimeColor: val })} defaultColor='#fff' />

						<BColor label={__('Media Title Color:', 'textdomain')} value={mediaTitleColor} onChange={val => setAttributes({ mediaTitleColor: val })} defaultColor='#fff' />

					</PanelBody>



					{/* <PanelBody className='bPlPanelBody' title={__('Custom Style', 'textdomain')}>
						<Background label={__('Background:', 'textdomain')} value={background} onChange={val => setAttributes({ background: val })} />

						<Typography className='mt20' label={__('Typography:', 'textdomain')} value={typography} onChange={val => setAttributes({ typography: val })} defaults={{ fontSize: 25 }} produce={produce} />

						<BColor label={__('Color:', 'textdomain')} value={color} onChange={val => setAttributes({ color: val })} defaultColor='#333' />

						<ColorsControl value={colors} onChange={val => setAttributes({ colors: val })} defaults={{ color: '#333', bg: '#fff' }} />

						<SpaceControl className='mt20' label={__('Padding:', 'textdomain')} value={padding} onChange={val => setAttributes({ padding: val })} defaults={{ vertical: '15px', horizontal: '30px' }} />

						<SeparatorControl className='mt20' value={separator} onChange={val => setAttributes({ separator: val })} defaults={{ width: '20%', height: '2px', style: 'solid', color: '#bbb' }} />

						<SpaceControl className='mt20' label={__('Margin:', 'textdomain')} value={margin} onChange={val => setAttributes({ margin: val })} defaults={{ side: 2, bottom: '15px' }} />

						<BorderControl label={__('Border:', 'textdomain')} value={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '5px' }} />

						<MultiShadowControl label={__('Shadow:', 'textdomain')} value={shadow} onChange={val => setAttributes({ shadow: val })} produce={produce} />
					</PanelBody> */}
				</>}
			</>}</TabPanel>
		</InspectorControls>


		<BlockControls>
			<ToolbarGroup className='bPlToolbar'>
				<ToolbarButton label={__('Add New Item', 'b-blocks')} onClick={addItem}><Dashicon icon='plus' size={23} /></ToolbarButton>
			</ToolbarGroup>

			<AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('Block Name Alignment')} alignmentControls={[
				{ title: __('Block Name in left', 'textdomain'), align: 'left', icon: 'align-left' },
				{ title: __('Block Name in center', 'textdomain'), align: 'center', icon: 'align-center' },
				{ title: __('Block Name in right', 'textdomain'), align: 'right', icon: 'align-right' }
			]} />

			<AlignmentToolbar value={textAlign} onChange={val => setAttributes({ textAlign: val })} />
		</BlockControls>
	</>;
};
export default Settings;
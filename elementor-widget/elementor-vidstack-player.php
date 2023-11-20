<?php


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Register oEmbed Widget.
 *
 * Include widget file and register widget class.
 *
 * @since 1.0.0
 * @param \Elementor\Widgets_Manager $widgets_manager Elementor widgets manager.
 * @return void
 */
function register_oembed_widget( $widgets_manager ) {

	require_once( __DIR__ . '/widgets/vidstack-widget.php' );

	$widgets_manager->register( new \Elementor_oEmbed_Widget() );

}
add_action( 'elementor/widgets/register', 'register_oembed_widget' );


function register_widget_styles() {
	wp_register_style( 'media-player-theme', "https://cdn.jsdelivr.net/npm/vidstack@^1.0.0/player/styles/default/theme.min.css" );
	wp_register_style( 'media-player-video', "https://cdn.jsdelivr.net/npm/vidstack@^1.0.0/player/styles/default/layouts/video.min.css" );
	wp_register_script( 'media-player-vidstack', 'https://cdn.jsdelivr.net/npm/vidstack@^1.0.0/cdn/with-layouts/vidstack.js');
}
add_action( 'wp_enqueue_scripts', 'register_widget_styles' );
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
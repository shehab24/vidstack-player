<?php
/**
 * Plugin Name: Vidstack Media Player
 * Description: Description of the Block Directory.
 * Version: 1.0.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: vsdp
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'VIDSTACK_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
define( 'VIDSTACK_DIR_URL', plugin_dir_url( __FILE__ ) );
define( 'VIDSTACK_DIR_PATH', plugin_dir_path( __FILE__ ) );

require_once VIDSTACK_DIR_PATH . 'inc/block.php';
require_once VIDSTACK_DIR_PATH . 'class/class-vidstack-player.php';
require_once VIDSTACK_DIR_PATH . 'elementor-widget/elementor-vidstack-player.php';


function vidstack_plugin_run(){
     new Vidstack_Player_Details();

  
}
vidstack_plugin_run();

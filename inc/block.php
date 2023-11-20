<?php
class vidstackMediaPlayer{
	public function __construct(){
		add_action( 'enqueue_block_assets', [$this, 'enqueueBlockAssets'] );
		add_filter( 'script_loader_tag', [$this, 'scriptLoaderTag'], 10, 3 );
		add_action( 'init', [$this, 'onInit'] );
	}

	function enqueueBlockAssets(){
		wp_register_style( 'fontAwesome', VIDSTACK_DIR_URL . 'assets/css/font-awesome.min.css', [], '6.4.2' ); // Icon
	}

	function scriptLoaderTag( $tag, $handle, $src ){
		if ( 'vidstack' !== $handle ) {
			return $tag;
		}
		$tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
		return $tag;
	}

	function onInit() {
		wp_register_style( 'vidstack-mediaPlayer-style', VIDSTACK_DIR_URL . 'dist/style.css', [], VIDSTACK_VERSION ); // Style
		wp_register_style( 'vidstack-mediaPlayer-editor-style', VIDSTACK_DIR_URL . 'dist/editor.css', [ 'vidstack-mediaPlayer-style' ], VIDSTACK_VERSION ); // Backend Style

		register_block_type( __DIR__, [
			'editor_style'		=> 'vidstack-mediaPlayer-editor-style',
			'render_callback'	=> [$this, 'render']
		] ); // Register Block

		wp_set_script_translations( 'vidstack-mediaPlayer-editor-script', 'textdomain', VIDSTACK_DIR_PATH . 'languages' );
	}

	function render( $attributes ){
		extract( $attributes );

		wp_enqueue_style( 'vidstack-mediaPlayer-style' );
		wp_enqueue_script( 'vidstack-mediaPlayer-script', VIDSTACK_DIR_URL . 'dist/script.js', [ 'react', 'react-dom' ], VIDSTACK_VERSION, true );
		wp_set_script_translations( 'vidstack-mediaPlayer-script', 'textdomain', VIDSTACK_DIR_PATH . 'languages' );

		$className = $className ?? '';
		$blockClassName = "wp-block-vidstack-mediaPlayer $className align$align";

		ob_start(); ?>
		<div class='<?php echo esc_attr( $blockClassName ); ?>' id='vidstackMediaPlayer-<?php echo esc_attr( $cId ) ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'></div>

		<?php return ob_get_clean();
	}
}
new vidstackMediaPlayer();
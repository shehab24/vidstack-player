<?php

class Vidstack_Player_Details {
	
     public function __construct(){

      
        $this->load_dependencies();
        $this->define_admin_hooks();
        $this->define_public_hooks();
          $this->define_global_hooks();
     }
      
     private function load_dependencies(){
      
        require_once VIDSTACK_DIR_PATH. 'admin/class-vidstack-player-admin.php';
        require_once VIDSTACK_DIR_PATH. 'public/class-vidstack-player-public.php';
     }

     public function define_admin_hooks(){
      
       $plugin_admin = new Vidstack_Player_Details_Admin();    
         add_action( 'admin_enqueue_scripts',  array($plugin_admin, 'admin_enqueue_scripts'  ));
         add_action( 'admin_enqueue_scripts',  array($plugin_admin, 'admin_enqueue_style'  ));
         add_action( 'init',  array($plugin_admin, 'custom_post_type_registration'  )); 
         add_filter('manage_vidstack_player_posts_columns', array($plugin_admin, 'add_custom_column_vidstack'));
         add_action('manage_vidstack_player_posts_custom_column', array($plugin_admin, 'add_vidstack_column_content'), 10, 2);
       
     }

     public function define_public_hooks(){
      $plugin_public = new Vidstack_Player_Details_Public();
      add_action( 'wp_enqueue_scripts',  array($plugin_public, 'public_enqueue_scripts'  ));
      add_action( 'wp_enqueue_scripts',  array($plugin_public, 'public_enqueue_style'  ));
      add_filter('script_loader_tag', array($plugin_public , 'add_module_type_attribute'), 10, 3);
     }

     public function define_global_hooks(){
      add_filter('use_block_editor_for_post', array($this , 'use_block_editor_callback'),  10, 2);
      add_shortcode('vidstack_player', array($this , 'my_vidstack_player_block_shortcode'));
      add_shortcode('vidstack_player_elementor', array($this , 'vidstack_player_elementor_shortcode'));
     }

     public function use_block_editor_callback($use_block_editor, $post_type){
		if($post_type->post_type == 'vidstack_player'){
			return true ;
		}
		return $use_block_editor;
	}

   public function  my_vidstack_player_block_shortcode($atts){
      $atts = shortcode_atts(
			array(
				'id'=>'', 
			),
			$atts,
		);

      $post_id = absint($atts['id']);
		$post = get_post( $post_id  );

     
		$blocks = parse_blocks($post->post_content);
   

		return  render_block( $blocks[0] );
   }

   public function  vidstack_player_elementor_shortcode($atts){
      $atts = shortcode_atts(
			array(
				'id'=>'', 
			),
			$atts,
		);
      $post = get_post( $atts['id']  );
		$blocks = parse_blocks($post->post_content);
      $videoUrl = (array_key_exists('video', $blocks[0]['attrs'])) ? $blocks[0]['attrs']['video']['url'] : "https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4"  ;
      $videoTitle = (array_key_exists('videoTitle', $blocks[0]['attrs'])) ? $blocks[0]['attrs']['videoTitle'] : "Vidstack Media Player"  ;
      $posterUrl = (array_key_exists('posterUrl', $blocks[0]['attrs'])) ? $blocks[0]['attrs']['posterUrl']['url'] : "https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp"  ;
      $chapterUrl = (array_key_exists('chapterUrl', $blocks[0]['attrs'])) ? $blocks[0]['attrs']['chapterUrl'] : "https://media-files.vidstack.io/sprite-fight/chapters.vtt"  ;
      $captionUrl = (array_key_exists('captionUrl', $blocks[0]['attrs'])) ? $blocks[0]['attrs']['captionUrl']: "https://media-files.vidstack.io/sprite-fight/subs/english.vtt"  ;
      $isCaption = (array_key_exists('isCaption', $blocks[0]['attrs'])) ? 0 : 1  ;
      $isChapter = (array_key_exists('isChapter', $blocks[0]['attrs'])) ? 0 : 1  ;
      ob_start();
      ?>
      
      <media-player title='<?php echo $videoTitle ?>' src='<?php echo $videoUrl ?>'>
			<media-provider>
            <?php
            if($isCaption == 1 ) :
            ?>
				 <track
					src='<?php echo $captionUrl ?>'
					kind="subtitles"
					label="English"
					default
					data-type="vtt"
				/>
				<?php
            endif ;
            ?>
				 <?php
            if($isChapter == 1 ) :
            ?>
            <track
					src='<?php echo $chapterUrl ?>'
					kind="chapters"
					default
					data-type="vtt"
				/>
				<?php
            endif ;
            ?>
				<media-poster
					class="vds-poster"
					src='<?php echo $posterUrl ?>'
				></media-poster>

			</media-provider>
			<media-video-layout ></media-video-layout>
		</media-player>


      <?php
      $html = ob_get_clean();
   
   //   echo "<pre>";
   //   print_r($isChapter);
   //   echo "</pre>";

   return $html ;

   }
     
   

  

}
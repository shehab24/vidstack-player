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
     }

     public function define_global_hooks(){
      add_filter('use_block_editor_for_post', array($this , 'use_block_editor_callback'),  10, 2);
      add_shortcode('vidstack_player', array($this , 'my_vidstack_player_block_shortcode'));
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
     
   

  

}
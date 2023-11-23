<?php


class Vidstack_Player_Details_Public{


     public function public_enqueue_scripts($hook_suffix){
        
            wp_enqueue_script( 'vidstack-player-public', VIDSTACK_DIR_URL. 'public/js/vidstack-player-public.js', array('jquery'), 1.0, true );
            wp_enqueue_script( 'media-player-vidstack', 'https://cdn.jsdelivr.net/npm/vidstack@^1.0.0/cdn/with-layouts/vidstack.js');
    
        
    }
     public function public_enqueue_style($hook_suffix){
        
            wp_enqueue_style( 'vidstack-player-public', VIDSTACK_DIR_URL. 'public/css/vidstack-player-public.css', array(), 1.0 );
            wp_enqueue_style( 'media-player-theme', "https://cdn.jsdelivr.net/npm/vidstack@^1.0.0/player/styles/default/theme.min.css" );
            wp_enqueue_style( 'media-player-video', "https://cdn.jsdelivr.net/npm/vidstack@^1.0.0/player/styles/default/layouts/video.min.css" );
        
    }

    public function add_module_type_attribute( $tag, $handle, $src ) {

        if ($handle === 'media-player-vidstack') {
                $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
            }
            return $tag;
    }


   
}
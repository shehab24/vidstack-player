<?php


class Vidstack_Player_Details_Public{


     public function public_enqueue_scripts($hook_suffix){
        
            wp_enqueue_script( 'vidstack-player-public', VIDSTACK_DIR_URL. 'public/js/vidstack-player-public.js', array('jquery'), 1.0, true );
        
    }
     public function public_enqueue_style($hook_suffix){
        
            wp_enqueue_style( 'vidstack-player-public', VIDSTACK_DIR_URL. 'public/css/vidstack-player-public.css', array(), 1.0 );
        
    }

   
}
<?php

class Vidstack_Player_Details_Admin{

    public function admin_enqueue_scripts($hook_suffix){
        
            wp_enqueue_script( 'vidstack-player-admin', VIDSTACK_DIR_URL. 'admin/js/vidstack-player-admin.js', array('jquery'), 1.0, true );
        
    }

    public function admin_enqueue_style($hook_suffix){
        
            wp_enqueue_style( 'vidstack-player-admin', VIDSTACK_DIR_URL. 'admin/css/vidstack-player-admin.css', array(), 1.0 );
        
    }

    public function custom_post_type_registration(){

		$args = array(
            'public'        => false,
            'labels'        => array(
                'name'          => 'Vidstack Player',
                'add_new'       => 'Add New',
                'add_new_item'  => 'Add New Player',
                'edit_item'     => 'Edit Player',
                'new_item'      => 'New Player',
                'view_item'     => 'View Player',
                'search_items'  => 'Search Players',
            ),
            'show_ui'       => true,
            'show_in_menu'  => true,
            'supports'      => array( 'title', 'editor' ),
            'rewrite'       => false,
            'show_in_rest'  => true,
            'template'      => array(
                array( 'vidstack/media-player' ),
            ),
            'template_lock' => 'all',
            'menu_icon'     => 'dashicons-controls-play',
        );
        
        register_post_type( 'vidstack_player', $args );
        

	}
    public function add_custom_column_vidstack($columns){
        $title_column_position = array_search('title', array_keys($columns));
        $columns = array_merge(
            array_slice($columns, 0, $title_column_position + 1),
            array('vidstack_player' => 'Vidstack Player'),
            array_slice($columns, $title_column_position + 1)
        );
     
        
        return $columns;
    }


    function add_vidstack_column_content($column, $post_id) {
        if ($column === 'vidstack_player') {
            echo '<input style="padding:5px;" onclick="this.select()" type=""text" value="[vidstack_player id='.$post_id.']" />';
           
        }
    }
}
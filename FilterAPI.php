<?php

/*
Plugin Name: 0xAungkon Filter Api
Plugin URI: https://0xaungkon.github.io/
Description: A simple plugin to display a greeting message.
Version: 1.0
Author: 0xaungkon
Author URI: https://0xaungkon.github.io/
License: GPL2
*/
// ini_set('display_errors', '1');
// ini_set('display_startup_errors', '1');
// error_reporting(E_ALL);

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

function afc_meta_serializer($data){
  $metas=array();
  foreach($data as $key=>$val){
      $tmp_data=explode('_',$key);
      if($tmp_data==false){
          continue;
      }
      $metas[$key]=$val;
  }
  return $metas;
}





add_action( 'rest_api_init', function () {
  register_rest_route( 'doctors/v1', '/get_drs/', array(
    'methods' => 'GET',
    'callback' => 'get_doctors_func',
  ) );
});






function get_doctors_func() {
    $args = array(
        'post_type' => 'doctors',
        'post_status' => 'published',
        'no_found_rows' => false, 
    );
    
    
    if(isset($_GET['specialization_ids'])){
        $specialization_ids = isset($_GET['specialization_ids']) ? json_decode(urldecode($_GET['specialization_ids']), true) : array();
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'specializations', // Replace with your actual taxonomy name
                'field' => 'id',
                'terms' => $specialization_ids,
            )
        );
    }
    
    $args['meta_query']['tax_query']['relation']='AND';
    if(isset($_GET['location_ids'])){
        $args['meta_query']['tax_query'][1]=array('relation'=>'OR');
        $location_ids = isset($_GET['location_ids']) ? json_decode(urldecode($_GET['location_ids']), true) : array();
        
        foreach($location_ids as $location_id){
            $args['meta_query']['tax_query'][1][]=array(
                'key' => 'location', // Replace with your meta key
                'value' => $location_id, // Value to search within the serialized array
                'compare' => 'LIKE' // Use LIKE operator for serialized arrays
            );
        }
        
        
    }
    
    $cancer_ids=false;
    if(isset($_GET['cancer_q'])){
        
        $args2 = array(
            'post_type' => 'cancers',
            'post_status' => 'publish',
            'numberposts' => -1,
            's' => $_GET['cancer_q'] // Replace 'brain' with the half name or partial name you want to search for
        );
        $cancers = get_posts($args2);
        $cancer_ids = array();
        foreach ($cancers as $cancer) {
            $cancer_post_title=strtolower($cancer->post_title);
            $get_cancer_name=strtolower($_GET['cancer_q']);
            if(strpos($cancer_post_title, $get_cancer_name) !== false){
                $cancer_ids[] = $cancer->ID; // Add each post ID to the array
            }

        }
    }
    
    
   if($cancer_ids){
        $args['meta_query']['tax_query'][2]=array('relation'=>'OR');
        foreach($cancer_ids as $cancer_treated_id){
            $args['meta_query']['tax_query'][2][]=array(
                'key' => 'cancer_treated', // Replace with your meta key
                'value' => $cancer_treated_id, // Value to search within the serialized array
                'compare' => 'LIKE' // Use LIKE operator for serialized arrays
            );
        }
        
        
        
    }
    
    
    $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
    
    $args['posts_per_page']= $limit;
    $args['offset']=$offset;
    
    // print_r($args);
    
    
    $query = new WP_Query($args);
    
    $doctors = $query->posts;
    $total_posts = $query->found_posts;
    
    // $doctors = get_posts($args);
    $data = array();

    foreach ($doctors as $doctor) {
        $doctor_id = $doctor->ID;

        $doctor_obj=array();
        
        $doctor_obj['id']=$doctor_id;
        $doctor_obj['title']=$doctor->post_title;
        
        $doctor_obj['slug']= $doctor->post_name;
        $doctor_obj['date'] = get_the_date('c', $doctor_id);
        $specializations = wp_get_post_terms($doctor_id, 'specializations', array('fields' => 'all'));

        $specializations_data = array();
        foreach ($specializations as $specialization) {
            $specializations_data[] = array(
                'id' => $specialization->term_id,
                'name' => $specialization->name
            );
        }
        $doctor_obj['specializations']['nodes']=$specializations_data;
        $doctor_obj['doctorsoptions']=array();
        
        
        $doctor_obj['doctorsoptions']['phone_number']=get_post_meta($doctor_id,'phone_number',true);
        $doctor_obj['doctorsoptions']['address']=get_post_meta($doctor_id,'address',true);
        $doctor_obj['doctorsoptions']['last_name']=get_post_meta($doctor_id,'last_name',true);
        
        $doctor_obj['doctorsoptions']['location']=[];
        foreach (get_post_meta($doctor_id,'location',true) as $location_id) {
            $location=array();
            $location['id']=$location_id;
            $location['title']=get_post( $location_id ) ->post_title;
            $doctor_obj['doctorsoptions']['location'][]=$location;
        }
        
        
        
        $doctor_obj['doctorsoptions']['cancer_treated']=[];
        
        foreach (get_post_meta($doctor_id,'cancer_treated',true) as $cancer_treated_id) {
            $cancer_treated=array();
            $cancer_treated['id']=$cancer_treated_id;
            $cancer_treated['title']=get_post( $cancer_treated_id ) ->post_title;
            $doctor_obj['doctorsoptions']['cancer_treated'][]=$cancer_treated;
        }
        
        
        $data[]=$doctor_obj;
    }
    
    
    $data=array('data'=>array('doctors'=>array('nodes'=>$data)));
    
    
    $data['pagination'] = array(
    'total' => $total_posts,
    'limit'=> $limit,
    'offset'=> $offset,
    
    // 'posts' => $doctors,
    );
    
    return new WP_REST_Response($data, 200);
}
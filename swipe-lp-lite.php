<?php
/**
 * Plugin Name: Swipe LP Lite
 * Description: 縦スワイプのLPをGutenbergブロックで作る最小プラグイン（コンテナ＋セクション）
 * Version: 1.0.0
 * Author: Your Name
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Text Domain: swipe-lp-lite
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// 多重読み込みガード
if ( defined( 'SWIPE_LP_LITE_BOOTSTRAPPED' ) ) {
	return;
}
define( 'SWIPE_LP_LITE_BOOTSTRAPPED', true );

// 定数は defined() でガード
if ( ! defined( 'SWIPE_LP_LITE_URL' ) ) {
	define( 'SWIPE_LP_LITE_URL', plugin_dir_url( __FILE__ ) );
}
if ( ! defined( 'SWIPE_LP_LITE_PATH' ) ) {
	define( 'SWIPE_LP_LITE_PATH', plugin_dir_path( __FILE__ ) );
}
if ( ! defined( 'SWIPE_LP_LITE_VER' ) ) {
	define( 'SWIPE_LP_LITE_VER', '0.1.4' );
}

/**
 * Front assets（SwiperはCDNを使用。ローカル配布にしたい場合は同梱へ変更）
 */
add_action( 'wp_enqueue_scripts', function() {
	wp_enqueue_style( 'swiper', 'https://unpkg.com/swiper@9/swiper-bundle.min.css', [], '9' );
	wp_enqueue_script( 'swiper', 'https://unpkg.com/swiper@9/swiper-bundle.min.js', [], '9', true );

	wp_enqueue_style( 'swipe-lp-lite', SWIPE_LP_LITE_URL . 'assets/swipe-lp.css', [ 'swiper' ], SWIPE_LP_LITE_VER );
	wp_enqueue_script( 'swipe-lp-lite', SWIPE_LP_LITE_URL . 'assets/swipe-lp.js', [ 'swiper' ], SWIPE_LP_LITE_VER, true );
} );

/**
 * Register Gutenberg Blocks
 */
add_action( 'init', function() {
	register_block_type( SWIPE_LP_LITE_PATH . 'src/container' );
	register_block_type( SWIPE_LP_LITE_PATH . 'src/section' );
} );

/**
 * Optional shortcode for fallback preview
 */
add_shortcode( 'swipe_lp', function( $atts, $content = '' ) {
	ob_start(); include SWIPE_LP_LITE_PATH . 'templates/lp.php'; return ob_get_clean();
} );

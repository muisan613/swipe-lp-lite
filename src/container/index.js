( function( wp ) {
  const { registerBlockType } = wp.blocks;
  const { useBlockProps, InnerBlocks } = wp.blockEditor;

  const TEMPLATE = [
    ['swipe-lp/section', { title: 'Hero', content: 'キャッチコピーを入力', bgColor: '#f0f0f0' }],
    ['swipe-lp/section', { title: 'Benefit', content: 'メリットを入力', bgColor: '#ffffff' }],
    ['swipe-lp/section', { title: 'CTA', content: 'お申し込みはこちら', bgColor: '#eeeeee' }],
  ];

  registerBlockType('swipe-lp/container', {
    edit() {
      const props = useBlockProps({ className: 'swiper swipe-lp' });
      return (
        <div {...props}>
          <p style={{textAlign:'center',fontStyle:'italic'}}>コンテナ配下にセクションを追加してください（初期テンプレ付き）</p>
          <InnerBlocks allowedBlocks={['swipe-lp/section']} template={TEMPLATE} templateLock={false} />
        </div>
      );
    },
    save() {
      const props = useBlockProps.save({ className: 'swiper swipe-lp' });
      return (
        <div {...props}>
          <div className="swiper-wrapper">
            <InnerBlocks.Content />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      );
    },
  });
} )( window.wp );

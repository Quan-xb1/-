// 资产评估工具导航 - 搜索 API
// 访问方式：search.json.js?q=关键词
// 返回：匹配结果数组 JSON

(function() {
  var params = new URLSearchParams(window.location.search);
  var query = (params.get('q') || '').toLowerCase().trim();

  document.write('<pre id="result" style="display:none">');

  if (!query) {
    document.write('[]');
    document.write('</pre>');
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'sites.json', false);
  xhr.send();

  if (xhr.status !== 200) {
    document.write('[]');
    document.write('</pre>');
    return;
  }

  try {
    var data = JSON.parse(xhr.responseText);
    var results = [];

    data.categories.forEach(function(cat) {
      cat.sites.forEach(function(site) {
        if (
          site.name.toLowerCase().includes(query) ||
          (site.desc && site.desc.toLowerCase().includes(query)) ||
          cat.name.toLowerCase().includes(query)
        ) {
          results.push({
            name: site.name,
            url: site.url,
            desc: site.desc,
            category: cat.name
          });
        }
      });
    });

    document.write(JSON.stringify(results));
  } catch (e) {
    document.write('[]');
  }

  document.write('</pre>');
})();

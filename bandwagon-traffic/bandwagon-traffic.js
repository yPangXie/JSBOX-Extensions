var BWH_KEY = $cache.get("BWH_KEY") || '';
var BWH_VEID = $cache.get("BWH_VEID") || '';

if (!BWH_VEID || !BWH_VEID) setConfig();
else getData();

/* 配置Bandwagon API信息 */
function setConfig() {
    $ui.render({
        props: {
            title: "Bandwagon API"
        },
        views: [{
            type: "label",
            props: {
                textColor: $color("#111"),
                font: $font(20),
                align: $align.center
            },
            layout: function (make, view) {
                make.right.equalTo(0);
                make.left.equalTo(0);
            }
        }, {
            type: 'label',
            props: {
                id: 'veid',
                text: "VEID",
                align: $align.left
            },
            layout: function (make, view) {
                make.top.equalTo(20);
                make.right.equalTo(0);
                make.left.equalTo(15);
            }
        }, {
            type: 'input',
            props: {
                text: BWH_VEID,
                align: $align.left
            },
            layout: function (make, view) {
                make.size.equalTo($size(120, 40))
                make.top.equalTo(10);
                make.right.equalTo(-15);
                make.left.equalTo(65)
            },
            events: {
                didEndEditing: function (sender) {
                    $cache.set("BWH_VEID", sender.text);
                }
            }
        }, {
            type: 'label',
            props: {
                id: 'key',
                text: "Key",
                align: $align.left
            },
            layout: function (make, view) {
                make.top.equalTo(65);
                make.right.equalTo(0);
                make.left.equalTo(15);
            }
        }, {
            type: 'input',
            props: {
                text: BWH_KEY,
                align: $align.left
            },
            layout: function (make, view) {
                make.size.equalTo($size(120, 40))
                make.top.equalTo(60);
                make.right.equalTo(-15);
                make.left.equalTo(65)
            },
            events: {
                didEndEditing: function (sender) {
                    $cache.set("BWH_KEY", sender.text);
                }
            }
        }, {
            type: "button",
            props: {
                title: "保存"
            },
            layout: function (make, view) {
                make.centerX.equalTo(view.super);
                make.top.equalTo(110);
                make.width.equalTo(80)
            },
            events: {
                tapped: function (sender) {
                    getData('push');
                }
            }
        }, {
            type: "label",
            props: {
                text: "说明: 你所填写的数据会保存在你设备的缓存里, 莫慌..",
                textColor: $color("#666"),
                font: $font(10),
                align: $align.left
            },
            layout: function (make, view) {
                make.top.equalTo(150);
                make.left.equalTo(20);
            }
        }]
    });
}

/* 渲染流量信息 */
function getData(type) {
    var request = `https://api.64clouds.com/v1/getServiceInfo?veid=${$cache.get("BWH_VEID")}&api_key=${$cache.get("BWH_KEY")}`;
    $http.get({
        url: request,
        handler: function (resp) {
            var data = resp.data || {};
            var status = `已使用${(data.data_counter * data.monthly_data_multiplier / 1024 / 1024 / 1024).toFixed(4)}G / ${(data.plan_monthly_data * data.monthly_data_multiplier / 1024 / 1024 / 1024).toFixed(4)}G`;

            xRender({
                props: {
                    id: "label",
                    title: "Bandwagon"
                },
                views: [{
                    type: "text",
                    props: {
                        text: status,
                        align: $align.center
                    },
                    layout: $layout.fill
                }]
            }, type || 'render');

            $ui.loading(true);
        }
    });
}

/* 数据切入效果 */
function xRender(obj, type) {
    type === 'render' ? $ui.render(obj) : $ui.push(obj);
}

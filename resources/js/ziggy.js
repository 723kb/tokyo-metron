const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"ignition.healthCheck":{"uri":"_ignition\/health-check","methods":["GET","HEAD"]},"ignition.executeSolution":{"uri":"_ignition\/execute-solution","methods":["POST"]},"ignition.updateConfig":{"uri":"_ignition\/update-config","methods":["POST"]},"top":{"uri":"\/","methods":["GET","HEAD"]},"main":{"uri":"main","methods":["GET","HEAD"]},"profile.edit":{"uri":"profile","methods":["GET","HEAD"]},"profile.update":{"uri":"profile","methods":["PATCH"]},"profile.destroy":{"uri":"profile","methods":["DELETE"]},"mypage.index":{"uri":"mypage","methods":["GET","HEAD"]},"comment.store":{"uri":"line\/{lineId}\/post\/{postId}\/comments","methods":["POST"],"parameters":["lineId","postId"]},"comment.destroy":{"uri":"comments\/{comment}","methods":["DELETE"],"parameters":["comment"],"bindings":{"comment":"id"}},"comments.like.store":{"uri":"comments\/{comment}\/like","methods":["POST"],"parameters":["comment"]},"comments.like.destroy":{"uri":"comments\/{comment}\/like","methods":["DELETE"],"parameters":["comment"]},"comments.like.status":{"uri":"comments\/{comment}\/like-status","methods":["GET","HEAD"],"parameters":["comment"]},"favorites.index":{"uri":"favorites","methods":["GET","HEAD"]},"favorites.create":{"uri":"favorites\/create","methods":["GET","HEAD"]},"favorites.store":{"uri":"favorites","methods":["POST"]},"favorites.edit":{"uri":"favorites\/edit","methods":["GET","HEAD"]},"favorites.update":{"uri":"favorites","methods":["PUT"]},"favorites.destroy":{"uri":"favorites\/{id}","methods":["DELETE"],"parameters":["id"]},"line-notify.callback":{"uri":"notification-settings","methods":["GET","HEAD"]},"notification-settings.update":{"uri":"notification-settings","methods":["PATCH"]},"line-notify.index":{"uri":"line-notify","methods":["GET","HEAD"]},"line-notify.disconnect":{"uri":"line-notify-disconnect","methods":["POST"]},"line.index":{"uri":"line\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"line.post.show":{"uri":"line\/{lineId}\/post\/{postId}","methods":["GET","HEAD"],"parameters":["lineId","postId"]},"status-update.store":{"uri":"status-update","methods":["POST"]},"register":{"uri":"register","methods":["GET","HEAD"]},"register.confirm":{"uri":"register\/confirm","methods":["POST"]},"register.store":{"uri":"register","methods":["POST"]},"register.result":{"uri":"register\/result","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"password.request":{"uri":"forgot-password","methods":["GET","HEAD"]},"password.email":{"uri":"forgot-password","methods":["POST"]},"password.reset":{"uri":"reset-password\/{token}","methods":["GET","HEAD"],"parameters":["token"]},"password.store":{"uri":"reset-password","methods":["POST"]},"verification.notice":{"uri":"verify-email","methods":["GET","HEAD"]},"verification.verify":{"uri":"verify-email\/{id}\/{hash}","methods":["GET","HEAD"],"parameters":["id","hash"]},"verification.send":{"uri":"email\/verification-notification","methods":["POST"]},"password.confirm":{"uri":"confirm-password","methods":["GET","HEAD"]},"password.update":{"uri":"password","methods":["PUT"]},"logout":{"uri":"logout","methods":["POST"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };

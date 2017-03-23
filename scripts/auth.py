from hashlib import md5
import hmac
print "?auth=" + hmac.new("gomeplusGER:dffe8496-de74-4225-ba9d-1fbba99daf78", None, md5).hexdigest()

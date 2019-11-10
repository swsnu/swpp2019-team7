'''Define the cron job for sending notification'''
from fcm_django.models import FCMDevice

def sendNoti():
    #TODO: Read in the notification model(not implemented yet), parse the time. 
    # This cronjob will be performed every minute. If the parsed time matches current time,
    # send the notification as below.
    # You should use 'filter' and search the device using the device token!
    device = FCMDevice.objects.all().first()    # This should be a for loop, looping through all devices
    print("Check if it's working")
    device.send_message(title="Have your pills", body="NOW!", icon="/Pillbox.png")
    print("message sent!")
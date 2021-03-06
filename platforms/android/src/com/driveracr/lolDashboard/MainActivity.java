/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.driveracr.lolDashboard;

import android.os.Bundle;
import org.apache.cordova.*;
import com.parse.Parse;
import com.parse.ParseAnalytics;
import com.parse.ParseInstallation;
import com.parse.PushService;
import com.parse.ParsePush;
import com.parse.ParseCrashReporting;	

public class MainActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
		Parse.initialize(this, "m02AeiYtBKS6uwWorv5yfobZ2pC4r8I83ZUAnfie", "r85oLdrDb82jV0yiaV9rCYlVq9xBIEqfc38Bsgmp");
		PushService.setDefaultPushCallback(this, CordovaApp.class);
		ParsePush.subscribeInBackground("Broadcast"); // if you want all app users to subscribe to a channel
		ParseInstallation.getCurrentInstallation().saveInBackground();
    }
}

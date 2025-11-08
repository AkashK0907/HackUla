package com.raksha.app;

import android.util.Log;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.JSObject;

@CapacitorPlugin(name = "RakshaAI")
public class RakshaAIPlugin extends Plugin {
    
    private static final String TAG = "RakshaAI";
    
    @PluginMethod
    public void initializeAI(PluginCall call) {
        Log.d(TAG, "AI Plugin initialized successfully");
        
        JSObject result = new JSObject();
        result.put("status", "success");
        result.put("message", "Raksha AI is ready!");
        
        call.resolve(result);
    }
    
    @PluginMethod
    public void askMedicalQuestion(PluginCall call) {
        String question = call.getString("question");
        
        if (question == null) {
            call.reject("Question is required");
            return;
        }
        
        Log.d(TAG, "Processing medical question: " + question);
        
        // For now, return a test response
        JSObject result = new JSObject();
        result.put("response", "Hello! I'm your Raksha AI assistant. You asked: " + question + ". I'm ready to help with medical questions!");
        result.put("isComplete", true);
        
        call.resolve(result);
    }
}

import 'package:flutter/material.dart';

class AttendeeListPage extends StatelessWidget {
  final String classId;
  final List<String> attendees; // List to hold the attendees

  const AttendeeListPage({super.key, required this.classId, required this.attendees});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Attendee List')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(
              'Class ID: $classId',
              style: const TextStyle(fontSize: 20),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: ListView.builder(
                itemCount: attendees.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(attendees[index]), // Displaying the attendee
                  );
                },
              ),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context); // Navigate back to the scan page
              },
              child: const Text('Scan Again'),
            ),
          ],
        ),
      ),
    );
  }
}

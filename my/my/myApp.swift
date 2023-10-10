//
//  myApp.swift
//  my
//
//  Created by Vyacheslav on 10.10.2023.
//

import SwiftUI

@main
struct myApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
